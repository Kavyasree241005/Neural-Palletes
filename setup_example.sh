#!/bin/bash

echo "Setting up Document Intelligence System example..."
echo "================================================"

# Create required directories
mkdir -p input pdfs output

# Check if example input exists and copy it
if [ -f "example_input.json" ]; then
    cp example_input.json input/input.json
    echo "✓ Copied example input to input/input.json"
else
    echo "⚠ example_input.json not found. Please create input/input.json manually"
fi

echo ""
echo "Directory structure created:"
echo "├── input/"
echo "│   └── input.json          # Your JSON input file"
echo "├── pdfs/"
echo "│   └── (place your PDF files here)"
echo "└── output/"
echo "    └── (results will appear here)"
echo ""
echo "Next steps:"
echo "1. Place your JSON input file in: input/input.json"
echo "2. Place your PDF files in: pdfs/"
echo "3. Run: docker build -t document-intelligence ."
echo "4. Run: docker run -v \$(pwd)/input:/app/input -v \$(pwd)/pdfs:/app/pdfs -v \$(pwd)/output:/app/output document-intelligence"
echo ""
echo "Or for local execution:"
echo "python main.py input/input.json --pdf-dir pdfs --output output/output.json"