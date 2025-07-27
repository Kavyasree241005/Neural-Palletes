import React from 'react';
import { User, Target } from 'lucide-react';

interface PersonaJobFormProps {
  persona: string;
  jobToBeDone: string;
  onPersonaChange: (persona: string) => void;
  onJobToBeDoneChange: (job: string) => void;
}

export const PersonaJobForm: React.FC<PersonaJobFormProps> = ({
  persona,
  jobToBeDone,
  onPersonaChange,
  onJobToBeDonaChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User className="inline h-4 w-4 mr-2" />
          Persona Role
        </label>
        <input
          type="text"
          value={persona}
          onChange={(e) => onPersonaChange(e.target.value)}
          placeholder="e.g., Travel Planner, PhD Researcher, Investment Analyst..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <p className="mt-1 text-xs text-gray-500">
          Define the role and expertise area of the person analyzing the documents
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Target className="inline h-4 w-4 mr-2" />
          Job to Be Done
        </label>
        <textarea
          value={jobToBeDone}
          onChange={(e) => onJobToBeDonaChange(e.target.value)}
          placeholder="e.g., Plan a trip of 4 days for a group of 10 college friends..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <p className="mt-1 text-xs text-gray-500">
          Describe the specific task or goal that needs to be accomplished
        </p>
      </div>
    </div>
  );
};