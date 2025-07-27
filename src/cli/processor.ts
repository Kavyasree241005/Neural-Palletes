import { readFileSync } from 'fs';
import { DocumentAnalyzer } from '../utils/documentAnalyzer';
import { PDFProcessor } from '../utils/pdfProcessor';
import { ChallengeInput, Document, AnalysisResult } from '../types';

export class CLIProcessor {
  private pdfProcessor: PDFProcessor;
  private analyzer: DocumentAnalyzer;

  constructor() {
    this.pdfProcessor = new PDFProcessor();
    this.analyzer = new DocumentAnalyzer();
  }

  async processInput(inputPath: string): Promise<AnalysisResult> {
    try {
      // Read and parse input JSON
      const inputData = JSON.parse(readFileSync(inputPath, 'utf-8')) as ChallengeInput;
      
      console.log(`Processing challenge: ${inputData.challenge_info.challenge_id}`);
      console.log(`Test case: ${inputData.challenge_info.test_case_name}`);
      console.log(`Documents: ${inputData.documents.length}`);
      console.log(`Persona: ${inputData.persona.role}`);
      console.log(`Task: ${inputData.job_to_be_done.task}`);
      console.log('\nExtracting text from documents...');

      // Process documents with mock content
      const documentsWithContent = await Promise.all(
        inputData.documents.map(async (doc) => ({
          ...doc,
          content: await this.pdfProcessor.extractText({ name: doc.filename } as File),
        }))
      );

      console.log('Analyzing content and extracting relevant sections...');

      // Analyze documents
      const results = await this.analyzer.analyzeDocuments(
        documentsWithContent,
        inputData.persona.role,
        inputData.job_to_be_done.task
      );

      console.log('Analysis complete!');
      return results;

    } catch (error) {
      console.error('Error processing input:', error);
      throw error;
    }
  }
}