import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
from typing import List, Dict, Tuple
import logging

class ContentAnalyzer:
    """Analyzes content relevance based on persona and job-to-be-done"""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.logger = logging.getLogger(__name__)
        
        # Initialize lightweight sentence transformer model
        try:
            self.sentence_model = SentenceTransformer(model_name)
        except Exception as e:
            self.logger.warning(f"Failed to load sentence transformer: {e}")
            self.sentence_model = None
        
        # Initialize TF-IDF vectorizer as fallback
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        
        # Download NLTK data if needed
        try:
            nltk.data.find('tokenizers/punkt')
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('punkt', quiet=True)
            nltk.download('stopwords', quiet=True)
    
    def analyze_relevance(self, sections: List[Dict], persona: str, job_to_be_done: str) -> List[Dict]:
        """Analyze and rank sections based on relevance to persona and task"""
        
        # Create query from persona and job
        query = f"{persona} {job_to_be_done}"
        
        # Extract section texts
        section_texts = [section['content'] for section in sections]
        
        if not section_texts:
            return []
        
        # Calculate relevance scores
        if self.sentence_model:
            scores = self._calculate_semantic_similarity(section_texts, query)
        else:
            scores = self._calculate_tfidf_similarity(section_texts, query)
        
        # Add scores to sections and sort by relevance
        for i, section in enumerate(sections):
            section['relevance_score'] = scores[i]
            section['importance_rank'] = 0  # Will be set after sorting
        
        # Sort by relevance score (descending)
        ranked_sections = sorted(sections, key=lambda x: x['relevance_score'], reverse=True)
        
        # Assign importance ranks
        for i, section in enumerate(ranked_sections):
            section['importance_rank'] = i + 1
        
        return ranked_sections
    
    def _calculate_semantic_similarity(self, texts: List[str], query: str) -> List[float]:
        """Calculate semantic similarity using sentence transformers"""
        try:
            # Encode texts and query
            text_embeddings = self.sentence_model.encode(texts)
            query_embedding = self.sentence_model.encode([query])
            
            # Calculate cosine similarity
            similarities = cosine_similarity(text_embeddings, query_embedding)
            return similarities.flatten().tolist()
        
        except Exception as e:
            self.logger.error(f"Error in semantic similarity calculation: {e}")
            return self._calculate_tfidf_similarity(texts, query)
    
    def _calculate_tfidf_similarity(self, texts: List[str], query: str) -> List[float]:
        """Calculate TF-IDF based similarity as fallback"""
        try:
            # Fit TF-IDF on all texts including query
            all_texts = texts + [query]
            tfidf_matrix = self.tfidf_vectorizer.fit_transform(all_texts)
            
            # Calculate similarity between each text and query
            query_vector = tfidf_matrix[-1]  # Last item is the query
            text_vectors = tfidf_matrix[:-1]  # All except query
            
            similarities = cosine_similarity(text_vectors, query_vector)
            return similarities.flatten().tolist()
        
        except Exception as e:
            self.logger.error(f"Error in TF-IDF similarity calculation: {e}")
            # Return uniform scores as last resort
            return [0.5] * len(texts)
    
    def refine_text(self, text: str, max_length: int = 500) -> str:
        """Refine and summarize text content"""
        # Clean text
        text = re.sub(r'\s+', ' ', text).strip()
        
        # If text is short enough, return as is
        if len(text) <= max_length:
            return text
        
        # Simple extractive summarization
        sentences = nltk.sent_tokenize(text)
        
        if len(sentences) <= 3:
            return text[:max_length] + "..." if len(text) > max_length else text
        
        # Score sentences based on word frequency
        words = word_tokenize(text.lower())
        stop_words = set(stopwords.words('english'))
        words = [word for word in words if word.isalnum() and word not in stop_words]
        
        word_freq = {}
        for word in words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        # Score sentences
        sentence_scores = {}
        for sentence in sentences:
            sentence_words = word_tokenize(sentence.lower())
            score = 0
            word_count = 0
            
            for word in sentence_words:
                if word in word_freq:
                    score += word_freq[word]
                    word_count += 1
            
            if word_count > 0:
                sentence_scores[sentence] = score / word_count
        
        # Select top sentences
        top_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Build summary
        summary = ""
        for sentence, _ in top_sentences:
            if len(summary + sentence) <= max_length:
                summary += sentence + " "
            else:
                break
        
        return summary.strip() if summary else text[:max_length] + "..."