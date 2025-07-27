#!/usr/bin/env node

import { CLIProcessor } from './processor';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npm run cli <input.json>');
    console.log('Example: npm run cli input.json');
    process.exit(1);
  }

  const inputPath = args[0];
  const processor = new CLIProcessor();

  try {
    const results = await processor.processInput(inputPath);
    
    // Generate output filename
    const outputPath = join(process.cwd(), 'output.json');
    
    // Write results to file
    writeFileSync(outputPath, JSON.stringify(results, null, 2));
    
    console.log(`\nResults written to: ${outputPath}`);
    console.log('\nSummary:');
    console.log(`- Extracted sections: ${results.extracted_sections.length}`);
    console.log(`- Subsection analyses: ${results.subsection_analysis.length}`);
    console.log(`- Processing time: ${results.metadata.processing_timestamp}`);
    
  } catch (error) {
    console.error('Processing failed:', error);
    process.exit(1);
  }
}

main();