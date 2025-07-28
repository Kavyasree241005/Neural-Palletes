# Document Intelligence System

A CPU-only, offline document analysis system that extracts and prioritizes relevant content from PDF collections based on persona and job-to-be-done.

## Features

- **CPU-Only Processing**: Runs efficiently without GPU requirements
- **Offline Operation**: No internet access needed during execution
- **Lightweight Models**: Uses models ≤1GB total size
- **Fast Processing**: Completes analysis in ≤60 seconds for 3-5 documents
- **Generic Solution**: Works across domains (research, business, education, etc.)

## Quick Start

### File Structure Setup

Create the following directory structure:

```
project/
├── input/
│   └── input.json          # Your JSON input file goes here
├── pdfs/
│   ├── document1.pdf       # Your PDF files go here
│   ├── document2.pdf
│   └── ...
├── output/
│   └── output.json         # Results will be generated here
└── (other project files)
```

### Using Docker (Recommended)

1. **Build the Docker image:**
```bash
docker build -t document-intelligence .
```

2. **Create directories and add your files:**
```bash
# Create the required directories
mkdir -p input pdfs output

# Place your JSON input file here:
cp your_input.json input/input.json

# Place your PDF files here:
cp *.pdf pdfs/
```

3. **Run the analysis:**
```bash
docker run -v $(pwd)/input:/app/input \
           -v $(pwd)/pdfs:/app/pdfs \
           -v $(pwd)/output:/app/output \
           document-intelligence
```

### Example Input File Location

Your JSON input file should be placed at: `input/input.json`

Example content:
```json
{
  "challenge_info": {
    "challenge_id": "round_1b_003",
    "test_case_name": "create_manageable_forms",
    "description": "Creating manageable forms"
  },
  "documents": [
    {
      "filename": "Learn Acrobat - Fill and Sign.pdf",
      "title": "Learn Acrobat - Fill and Sign"
    }
  ],
  "persona": {
    "role": "HR professional"
  },
  "job_to_be_done": {
    "task": "Create and manage fillable forms for onboarding and compliance."
  }
}
```

### Local Installation

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Prepare directories and run:**
```bash
mkdir -p input pdfs output
# Add your input.json to input/ directory
# Add your PDF files to pdfs/ directory
python main.py input.json --pdf-dir pdfs --output output.json
```

## Input Format

Create an `input.json` file with the following structure:

```json
{
  "challenge_info": {
    "challenge_id": "round_1b_001",
    "test_case_name": "example_case",
    "description": "Example analysis"
  },
  "documents": [
    {
      "filename": "document1.pdf",
      "title": "Document 1 Title"
    }
  ],
  "persona": {
    "role": "Your Persona Role"
  },
  "job_to_be_done": {
    "task": "Specific task description"
  }
}
```

## Output Format

The system generates a JSON output with:

- **Metadata**: Input documents, persona, job-to-be-done, processing timestamp
- **Extracted Sections**: Document name, section title, importance rank, page number
- **Subsection Analysis**: Refined text content with document reference and page number

## System Requirements

- **Memory**: ≤2GB RAM recommended
- **Storage**: ~1GB for models and dependencies
- **CPU**: Any modern CPU (no GPU required)
- **OS**: Linux, macOS, or Windows with Docker

## Architecture

- `src/pdf_processor.py`: PDF text extraction and section identification
- `src/content_analyzer.py`: Relevance scoring and content refinement
- `src/document_intelligence.py`: Main processing orchestration
- `main.py`: Command-line interface

## Performance

- **Model Size**: ~80MB sentence transformer + dependencies
- **Processing Time**: Typically 15-45 seconds for 3-5 documents
- **Memory Usage**: ~500MB-1GB during processing
- **Accuracy**: Optimized for persona-task relevance matching

## Examples

See `example_input.json` for a sample input file. The system has been tested with:

- Travel planning documents
- Technical documentation
- Research papers
- Business reports
- Educational materials

## Troubleshooting

**Long processing times**: Ensure sufficient RAM and close other applications
**PDF extraction issues**: Verify PDFs are text-based (not scanned images)
**Docker issues**: Check that required directories exist and have proper permissions

For more details, see `approach_explanation.md`.