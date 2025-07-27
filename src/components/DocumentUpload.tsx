import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Document } from '../types';

interface DocumentUploadProps {
  documents: Document[];
  onDocumentsChange: (documents: Document[]) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  onDocumentsChange,
}) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const newDocuments = files.map((file) => ({
        filename: file.name,
        title: file.name.replace('.pdf', ''),
        file,
      }));
      onDocumentsChange([...documents, ...newDocuments]);
    },
    [documents, onDocumentsChange]
  );

  const removeDocument = useCallback(
    (index: number) => {
      const updatedDocuments = documents.filter((_, i) => i !== index);
      onDocumentsChange(updatedDocuments);
    },
    [documents, onDocumentsChange]
  );

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">Upload PDF Documents</p>
          <p className="text-sm text-gray-600">
            Select 3-10 related PDF documents for analysis
          </p>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="document-upload"
          />
          <label
            htmlFor="document-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
          >
            Choose Files
          </label>
        </div>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            Uploaded Documents ({documents.length})
          </h3>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                    <p className="text-xs text-gray-500">{doc.filename}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};