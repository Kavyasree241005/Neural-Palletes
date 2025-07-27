export interface Document {
  filename: string;
  title: string;
  content?: string;
  file?: File;
}

export interface Persona {
  role: string;
}

export interface JobToBeDone {
  task: string;
}

export interface ExtractedSection {
  document: string;
  section_title: string;
  importance_rank: number;
  page_number: number;
}

export interface SubsectionAnalysis {
  document: string;
  refined_text: string;
  page_number: number;
}

export interface AnalysisResult {
  metadata: {
    input_documents: string[];
    persona: string;
    job_to_be_done: string;
    processing_timestamp: string;
  };
  extracted_sections: ExtractedSection[];
  subsection_analysis: SubsectionAnalysis[];
}

export interface ChallengeInput {
  challenge_info: {
    challenge_id: string;
    test_case_name: string;
    description: string;
  };
  documents: Document[];
  persona: Persona;
  job_to_be_done: JobToBeDone;
}