import React, { useState } from 'react';
import { Brain, FileText, Sparkles } from 'lucide-react';
import { DocumentUpload } from './components/DocumentUpload';
import { PersonaJobForm } from './components/PersonaJobForm';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Document, AnalysisResult } from './types';
import { PDFProcessor } from './utils/pdfProcessor';
import { DocumentAnalyzer } from './utils/documentAnalyzer';

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [persona, setPersona] = useState('');
  const [jobToBeDone, setJobToBeDone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  const canProcess = documents.length >= 3 && persona.trim() && jobToBeDone.trim();

  const handleAnalyze = async () => {
    if (!canProcess) return;

    setIsProcessing(true);
    setResults(null);

    try {
      const pdfProcessor = new PDFProcessor();
      const analyzer = new DocumentAnalyzer();

      // Step 1: Extract text from PDFs
      setCurrentStep('Extracting text from PDF documents...');
      const documentsWithContent = await Promise.all(
        documents.map(async (doc) => ({
          ...doc,
          content: doc.file ? await pdfProcessor.extractText(doc.file) : '',
        }))
      );

      // Step 2: Analyze documents
      setCurrentStep('Analyzing content and extracting relevant sections...');
      const analysisResults = await analyzer.analyzeDocuments(
        documentsWithContent,
        persona,
        jobToBeDone
      );

      setResults(analysisResults);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsProcessing(false);
      setCurrentStep('');
    }
  };

  const loadSampleData = () => {
    const sampleDocuments: Document[] = [
      { filename: 'South of France - Cities.pdf', title: 'South of France - Cities' },
      { filename: 'South of France - Cuisine.pdf', title: 'South of France - Cuisine' },
      { filename: 'South of France - History.pdf', title: 'South of France - History' },
      { filename: 'South of France - Restaurants and Hotels.pdf', title: 'South of France - Restaurants and Hotels' },
      { filename: 'South of France - Things to Do.pdf', title: 'South of France - Things to Do' },
      { filename: 'South of France - Tips and Tricks.pdf', title: 'South of France - Tips and Tricks' },
      { filename: 'South of France - Traditions and Culture.pdf', title: 'South of France - Traditions and Culture' },
    ];

    setDocuments(sampleDocuments);
    setPersona('Travel Planner');
    setJobToBeDone('Plan a trip of 4 days for a group of 10 college friends.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Document Intelligence System
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Persona-driven document analysis that extracts and prioritizes the most relevant 
            sections from your document collection based on specific roles and objectives.
          </p>
          <button
            onClick={loadSampleData}
            className="mt-4 inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Load Sample Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Section */}
          <div className="space-y-8">
            {/* Document Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Document Collection</h2>
              </div>
              <DocumentUpload
                documents={documents}
                onDocumentsChange={setDocuments}
              />
            </div>

            {/* Persona & Job Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Configuration</h2>
              <PersonaJobForm
                persona={persona}
                jobToBeDone={jobToBeDone}
                onPersonaChange={setPersona}
                onJobToBeDonaChange={setJobToBeDone}
              />
            </div>

            {/* Process Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!canProcess || isProcessing}
                className={`
                  inline-flex items-center px-8 py-3 text-lg font-medium rounded-lg transition-all
                  ${canProcess && !isProcessing
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <Brain className="h-5 w-5 mr-3" />
                {isProcessing ? 'Analyzing Documents...' : 'Analyze Documents'}
              </button>
              {!canProcess && (
                <p className="mt-2 text-sm text-gray-500">
                  Upload at least 3 documents and fill in all fields to begin analysis
                </p>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <ProcessingStatus
              isProcessing={isProcessing}
              isComplete={!!results}
              hasError={false}
              currentStep={currentStep}
            />
            
            {results && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <ResultsDisplay results={results} />
              </div>
            )}
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            System Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Document Processing</h3>
              <p className="text-sm text-gray-600">
                Efficiently extracts and processes content from multiple PDF documents with intelligent section identification.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Persona-Driven Analysis</h3>
              <p className="text-sm text-gray-600">
                Tailors content extraction and prioritization based on specific user roles and objectives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intelligent Ranking</h3>
              <p className="text-sm text-gray-600">
                Automatically ranks sections by importance and relevance to help focus on what matters most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;