import React from 'react';
import { Download, FileText, Hash, Clock } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  results: AnalysisResult | null;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const downloadJSON = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document_analysis_results.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!results) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
        <button
          onClick={downloadJSON}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download JSON
        </button>
      </div>

      {/* Metadata */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Analysis Metadata</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Persona:</span>
            <span className="ml-2 text-gray-600">{results.metadata.persona}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Documents:</span>
            <span className="ml-2 text-gray-600">{results.metadata.input_documents.length}</span>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-gray-700">Job to be Done:</span>
            <span className="ml-2 text-gray-600">{results.metadata.job_to_be_done}</span>
          </div>
          <div className="md:col-span-2 flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-xs text-gray-500">
              Processed: {new Date(results.metadata.processing_timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Extracted Sections */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Extracted Sections</h3>
        <div className="space-y-3">
          {results.extracted_sections.map((section, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`
                    flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium text-white
                    ${section.importance_rank <= 2 ? 'bg-green-500' : 
                      section.importance_rank <= 4 ? 'bg-yellow-500' : 'bg-gray-500'}
                  `}>
                    {section.importance_rank}
                  </div>
                  <h4 className="font-medium text-gray-900">{section.section_title}</h4>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <FileText className="h-3 w-3" />
                  <span>Page {section.page_number}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate">{section.document}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subsection Analysis */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Analysis</h3>
        <div className="space-y-4">
          {results.subsection_analysis.map((subsection, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 truncate">
                  {subsection.document}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Hash className="h-3 w-3" />
                  <span>Page {subsection.page_number}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {subsection.refined_text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};