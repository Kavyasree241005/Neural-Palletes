#!/usr/bin/env python3
"""
Document Intelligence System - Main Entry Point
Processes PDF documents based on persona and job-to-be-done
"""

import os
import sys
import json
import argparse
from pathlib import Path

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from document_intelligence import DocumentIntelligenceSystem

def main():
    parser = argparse.ArgumentParser(description='Document Intelligence System')
    parser.add_argument('input_file', help='Path to input JSON file')
    parser.add_argument('--pdf-dir', default='pdfs', help='Directory containing PDF files')
    parser.add_argument('--output', default='output.json', help='Output JSON file')
    
    args = parser.parse_args()
    
    # Validate input file
    if not os.path.exists(args.input_file):
        print(f"Error: Input file '{args.input_file}' not found")
        sys.exit(1)
    
    # Validate PDF directory
    if not os.path.exists(args.pdf_dir):
        print(f"Error: PDF directory '{args.pdf_dir}' not found")
        sys.exit(1)
    
    try:
        # Load input data
        with open(args.input_file, 'r') as f:
            input_data = json.load(f)
        
        # Initialize system
        system = DocumentIntelligenceSystem()
        
        # Process documents
        print("Processing documents...")
        output = system.process_documents(input_data, args.pdf_dir)
        
        # Save output
        with open(args.output, 'w') as f:
            json.dump(output, f, indent=2)
        
        print(f"Processing complete! Results saved to {args.output}")
        print(f"Extracted {len(output['extracted_sections'])} sections")
        print(f"Generated {len(output['subsection_analysis'])} subsection analyses")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()