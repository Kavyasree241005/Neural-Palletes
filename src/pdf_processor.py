import PyPDF2
import re
from typing import List, Dict, Tuple
import logging

class PDFProcessor:
    """Handles PDF text extraction and section identification"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def extract_text_from_pdf(self, pdf_path: str) -> Dict[int, str]:
        """Extract text from PDF, organized by page number"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                pages_text = {}
                
                for page_num, page in enumerate(pdf_reader.pages, 1):
                    text = page.extract_text()
                    if text.strip():
                        pages_text[page_num] = text
                
                return pages_text
        except Exception as e:
            self.logger.error(f"Error extracting text from {pdf_path}: {e}")
            return {}
    
    def identify_sections(self, pages_text: Dict[int, str]) -> List[Dict]:
        """Identify sections within the document using heuristics"""
        sections = []
        
        for page_num, text in pages_text.items():
            # Split text into lines for analysis
            lines = text.split('\n')
            current_section = None
            section_content = []
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                
                # Detect section headers using various patterns
                if self._is_section_header(line):
                    # Save previous section if exists
                    if current_section and section_content:
                        sections.append({
                            'title': current_section,
                            'content': ' '.join(section_content),
                            'page_number': page_num,
                            'word_count': len(' '.join(section_content).split())
                        })
                    
                    # Start new section
                    current_section = line
                    section_content = []
                else:
                    if current_section:
                        section_content.append(line)
            
            # Add final section if exists
            if current_section and section_content:
                sections.append({
                    'title': current_section,
                    'content': ' '.join(section_content),
                    'page_number': page_num,
                    'word_count': len(' '.join(section_content).split())
                })
        
        return sections
    
    def _is_section_header(self, line: str) -> bool:
        """Determine if a line is likely a section header"""
        # Various heuristics for section detection
        patterns = [
            r'^[A-Z][A-Za-z\s]{5,50}$',  # Title case headers
            r'^\d+\.\s+[A-Z]',  # Numbered sections
            r'^[A-Z\s]{10,}$',  # All caps headers
            r'^Chapter\s+\d+',  # Chapter headers
            r'^Section\s+\d+',  # Section headers
        ]
        
        # Check length and format
        if len(line) < 5 or len(line) > 100:
            return False
        
        # Check against patterns
        for pattern in patterns:
            if re.match(pattern, line):
                return True
        
        # Check for title-like characteristics
        words = line.split()
        if len(words) >= 2 and len(words) <= 10:
            # Most words start with capital letter
            capitalized = sum(1 for word in words if word[0].isupper())
            if capitalized / len(words) >= 0.7:
                return True
        
        return False