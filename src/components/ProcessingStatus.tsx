import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  isComplete: boolean;
  hasError: boolean;
  currentStep?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  isComplete,
  hasError,
  currentStep = 'Processing documents...',
}) => {
  if (!isProcessing && !isComplete && !hasError) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        {isProcessing && (
          <>
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            <div>
              <p className="text-sm font-medium text-gray-900">Processing...</p>
              <p className="text-xs text-gray-500">{currentStep}</p>
            </div>
          </>
        )}
        
        {isComplete && (
          <>
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Analysis Complete</p>
              <p className="text-xs text-gray-500">Results are ready for review</p>
            </div>
          </>
        )}
        
        {hasError && (
          <>
            <AlertCircle className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Processing Error</p>
              <p className="text-xs text-gray-500">Please try again</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};