#!/bin/bash

# Example script to run the document intelligence system

echo "Document Intelligence System - Example Run"
echo "=========================================="

# Create directories if they don't exist
mkdir -p input pdfs output

# Check if example input exists
if [ ! -f "example_input.json" ]; then
    echo "Error: example_input.json not found"
    exit 1
fi

# Copy example input to input directory
cp example_input.json input/input.json

# Check if PDF directory has files
if [ ! "$(ls -A pdfs)" ]; then
    echo "Warning: pdfs directory is empty"
    echo "Please add PDF files matching the filenames in input.json"
    echo ""
    echo "Expected files based on example_input.json:"
    echo "- South of France - Cities.pdf"
    echo "- South of France - Cuisine.pdf"
    echo "- South of France - Things to Do.pdf"
    echo "- South of France - Tips and Tricks.pdf"
    echo ""
    echo "Exiting..."
    exit 1
fi

echo "Starting document analysis..."
echo ""

# Run with Docker if available, otherwise run locally
if command -v docker &> /dev/null; then
    echo "Using Docker..."
    docker build -t document-intelligence . && \
    docker run -v $(pwd)/input:/app/input \
               -v $(pwd)/pdfs:/app/pdfs \
               -v $(pwd)/output:/app/output \
               document-intelligence
else
    echo "Using local Python installation..."
    python main.py input/input.json --pdf-dir pdfs --output output/output.json
fi

# Check if output was generated
if [ -f "output/output.json" ]; then
    echo ""
    echo "Analysis complete! Results saved to output/output.json"
    echo ""
    echo "Summary:"
    python -c "
import json
with open('output/output.json', 'r') as f:
    data = json.load(f)
print(f'- Processed {len(data[\"metadata\"][\"input_documents\"])} documents')
print(f'- Extracted {len(data[\"extracted_sections\"])} sections')
print(f'- Generated {len(data[\"subsection_analysis\"])} analyses')
print(f'- Processing time: {data[\"metadata\"][\"processing_timestamp\"]}')
"
else
    echo "Error: No output file generated"
    exit 1
fi