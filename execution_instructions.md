# Document Intelligence System - Execution Instructions

## Prerequisites

- Docker installed on your system
- At least 2GB RAM available
- CPU-only environment (no GPU required)

## Building the Docker Image

```bash
# Build the Docker image
docker build -t document-intelligence-system .
```

## Running the Application

```bash
# Run the container
docker run -p 4173:4173 document-intelligence-system
```

The application will be available at `http://localhost:4173`

## Alternative: Local Development

If you prefer to run without Docker:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at `http://localhost:5173`

## Usage Instructions

1. **Upload Documents**: Click "Choose Files" to upload 3-10 PDF documents
2. **Define Persona**: Enter the role (e.g., "Travel Planner", "PhD Researcher")
3. **Specify Job**: Describe the task to be accomplished
4. **Analyze**: Click "Analyze Documents" to start processing
5. **Review Results**: View extracted sections and download JSON output

## Sample Data

The application includes a "Load Sample Data" button that demonstrates the system with:
- 7 South of France travel documents
- Travel Planner persona
- Group trip planning task

## Performance Specifications

- **Processing Time**: <60 seconds for 3-5 documents
- **Model Size**: <1GB total system requirements
- **CPU Only**: No GPU acceleration required
- **Memory Usage**: <2GB RAM recommended

## Output Format

The system generates JSON output matching the challenge specification:
- Metadata with processing information
- Extracted sections with importance ranking
- Detailed subsection analysis with refined text

## Troubleshooting

**Long Processing Times**: Ensure sufficient RAM is available and close other applications

**Upload Issues**: Verify PDF files are not corrupted and are under 10MB each

**Docker Issues**: Check that port 4173 is not in use by other applications

## Technical Notes

The system uses lightweight, rule-based processing optimized for CPU-only environments. For production deployment, consider:
- Implementing server-side PDF processing
- Adding progress indicators for large document sets
- Enabling result caching for repeat analyses