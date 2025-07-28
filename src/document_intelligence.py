import os
import json
import logging
from datetime import datetime
from typing import List, Dict, Any
from pathlib import Path

from .pdf_processor import PDFProcessor
from .content_analyzer import ContentAnalyzer

class DocumentIntelligenceSystem:
    """Main system for processing documents and generating intelligence"""
    
    def __init__(self):
        self.pdf_processor = PDFProcessor()
        self.content_analyzer = ContentAnalyzer()
        self.logger = logging.getLogger(__name__)
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    
    def process_documents(self, input_data: Dict[str, Any], pdf_directory: str) -> Dict[str, Any]:
        """Process documents according to input specification"""
        
        start_time = datetime.now()
        self.logger.info("Starting document processing...")
        
        # Extract input parameters
        documents = input_data.get('documents', [])
        persona = input_data.get('persona', {}).get('role', '')
        job_to_be_done = input_data.get('job_to_be_done', {}).get('task', '')
        
        if not documents or not persona or not job_to_be_done:
            raise ValueError("Missing required input parameters")
        
        # Process each document
        all_sections = []
        processed_documents = []
        
        for doc_info in documents:
            filename = doc_info['filename']
            pdf_path = os.path.join(pdf_directory, filename)
            
            if not os.path.exists(pdf_path):
                self.logger.warning(f"PDF file not found: {pdf_path}")
                continue
            
            self.logger.info(f"Processing {filename}...")
            
            # Extract text from PDF
            pages_text = self.pdf_processor.extract_text_from_pdf(pdf_path)
            
            if not pages_text:
                self.logger.warning(f"No text extracted from {filename}")
                continue
            
            # Identify sections
            sections = self.pdf_processor.identify_sections(pages_text)
            
            # Add document info to sections
            for section in sections:
                section['document'] = filename
            
            all_sections.extend(sections)
            processed_documents.append(filename)
        
        if not all_sections:
            raise ValueError("No content could be extracted from the provided documents")
        
        # Analyze relevance and rank sections
        self.logger.info("Analyzing content relevance...")
        ranked_sections = self.content_analyzer.analyze_relevance(
            all_sections, persona, job_to_be_done
        )
        
        # Select top sections (limit to 5-10 most relevant)
        top_sections = ranked_sections[:min(10, len(ranked_sections))]
        
        # Generate output
        output = self._generate_output(
            input_data, processed_documents, top_sections, persona, job_to_be_done
        )
        
        processing_time = (datetime.now() - start_time).total_seconds()
        self.logger.info(f"Processing completed in {processing_time:.2f} seconds")
        
        return output
    
    def _generate_output(self, input_data: Dict, processed_documents: List[str], 
                        sections: List[Dict], persona: str, job_to_be_done: str) -> Dict[str, Any]:
        """Generate the final output in the required format"""
        
        # Prepare extracted sections
        extracted_sections = []
        for section in sections:
            extracted_sections.append({
                'document': section['document'],
                'section_title': section['title'],
                'importance_rank': section['importance_rank'],
                'page_number': section['page_number']
            })
        
        # Prepare subsection analysis
        subsection_analysis = []
        for section in sections:
            refined_text = self.content_analyzer.refine_text(section['content'])
            subsection_analysis.append({
                'document': section['document'],
                'refined_text': refined_text,
                'page_number': section['page_number']
            })
        
        # Build final output
        output = {
            'metadata': {
                'input_documents': processed_documents,
                'persona': persona,
                'job_to_be_done': job_to_be_done,
                'processing_timestamp': datetime.now().isoformat()
            },
            'extracted_sections': extracted_sections,
            'subsection_analysis': subsection_analysis
        }
        
        return output