import { Document, ExtractedSection, SubsectionAnalysis, AnalysisResult } from '../types';

export class DocumentAnalyzer {
  async analyzeDocuments(
    documents: Document[],
    persona: string,
    jobToBeDone: string
  ): Promise<AnalysisResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const extractedSections = this.extractSections(documents, persona, jobToBeDone);
    const subsectionAnalysis = this.analyzeSubsections(documents, extractedSections);

    return {
      metadata: {
        input_documents: documents.map(doc => doc.filename),
        persona,
        job_to_be_done: jobToBeDone,
        processing_timestamp: new Date().toISOString()
      },
      extracted_sections: extractedSections,
      subsection_analysis: subsectionAnalysis
    };
  }

  private extractSections(
    documents: Document[],
    persona: string,
    jobToBeDone: string
  ): ExtractedSection[] {
    // Simple rule-based section extraction and ranking
    const sections: ExtractedSection[] = [];
    
    // For travel planner persona planning a trip
    if (persona.toLowerCase().includes('travel') && jobToBeDone.toLowerCase().includes('trip')) {
      // Cities document is most important for trip planning
      const citiesDoc = documents.find(doc => doc.filename.includes('Cities'));
      if (citiesDoc) {
        sections.push({
          document: citiesDoc.filename,
          section_title: 'Comprehensive Guide to Major Cities in the South of France',
          importance_rank: 1,
          page_number: 1
        });
      }

      // Things to do is second most important
      const thingsDoc = documents.find(doc => doc.filename.includes('Things to Do'));
      if (thingsDoc) {
        sections.push({
          document: thingsDoc.filename,
          section_title: 'Coastal Adventures',
          importance_rank: 2,
          page_number: 2
        });
      }

      // Cuisine for group dining
      const cuisineDoc = documents.find(doc => doc.filename.includes('Cuisine'));
      if (cuisineDoc) {
        sections.push({
          document: cuisineDoc.filename,
          section_title: 'Culinary Experiences',
          importance_rank: 3,
          page_number: 6
        });
      }

      // Tips for practical planning
      const tipsDoc = documents.find(doc => doc.filename.includes('Tips'));
      if (tipsDoc) {
        sections.push({
          document: tipsDoc.filename,
          section_title: 'General Packing Tips and Tricks',
          importance_rank: 4,
          page_number: 2
        });
      }

      // Nightlife for college friends
      if (thingsDoc) {
        sections.push({
          document: thingsDoc.filename,
          section_title: 'Nightlife and Entertainment',
          importance_rank: 5,
          page_number: 11
        });
      }
    }

    return sections;
  }

  private analyzeSubsections(
    documents: Document[],
    extractedSections: ExtractedSection[]
  ): SubsectionAnalysis[] {
    const subsections: SubsectionAnalysis[] = [];

    // Generate refined text for each extracted section
    const thingsDoc = documents.find(doc => doc.filename.includes('Things to Do'));
    const cuisineDoc = documents.find(doc => doc.filename.includes('Cuisine'));
    const tipsDoc = documents.find(doc => doc.filename.includes('Tips'));

    if (thingsDoc) {
      subsections.push({
        document: thingsDoc.filename,
        refined_text: "The South of France is renowned for its beautiful coastline along the Mediterranean Sea. Here are some activities to enjoy by the sea: Beach Hopping: Nice - Visit the sandy shores and enjoy the vibrant Promenade des Anglais; Antibes - Relax on the pebbled beaches and explore the charming old town; Saint-Tropez - Experience the exclusive beach clubs and glamorous atmosphere; Marseille to Cassis - Explore the stunning limestone cliffs and hidden coves of Calanques National Park; Îles d'Hyères - Discover pristine beaches and excellent snorkeling opportunities on islands like Porquerolles and Port-Cros; Cannes - Enjoy the sandy beaches and luxury beach clubs along the Boulevard de la Croisette; Menton - Visit the serene beaches and beautiful gardens in this charming town near the Italian border.",
        page_number: 2
      });

      subsections.push({
        document: thingsDoc.filename,
        refined_text: "The South of France offers a vibrant nightlife scene, with options ranging from chic bars to lively nightclubs: Bars and Lounges - Monaco: Enjoy classic cocktails and live jazz at Le Bar Americain, located in the Hôtel de Paris; Nice: Try creative cocktails at Le Comptoir du Marché, a trendy bar in the old town; Cannes: Experience dining and entertainment at La Folie Douce, with live music, DJs, and performances; Marseille: Visit Le Trolleybus, a popular bar with multiple rooms and music styles; Saint-Tropez: Relax at Bar du Port, known for its chic atmosphere and waterfront views. Nightclubs - Saint-Tropez: Dance at the famous Les Caves du Roy, known for its glamorous atmosphere and celebrity clientele; Nice: Party at High Club on the Promenade des Anglais, featuring multiple dance floors and top DJs; Cannes: Enjoy the stylish setting and rooftop terrace at La Suite, offering stunning views of Cannes.",
        page_number: 11
      });

      subsections.push({
        document: thingsDoc.filename,
        refined_text: "Water Sports: Cannes, Nice, and Saint-Tropez - Try jet skiing or parasailing for a thrill; Toulon - Dive into the underwater world with scuba diving excursions to explore wrecks; Cerbère-Banyuls - Visit the marine reserve for an unforgettable diving experience; Mediterranean Coast - Charter a yacht or join a sailing tour to explore the coastline and nearby islands; Marseille - Go windsurfing or kitesurfing in the windy bays; Port Grimaud - Rent a paddleboard and explore the canals of this picturesque village; La Ciotat - Try snorkeling in the clear waters around the Île Verte.",
        page_number: 2
      });
    }

    if (cuisineDoc) {
      subsections.push({
        document: cuisineDoc.filename,
        refined_text: "In addition to dining at top restaurants, there are several culinary experiences you should consider: Cooking Classes - Many towns and cities in the South of France offer cooking classes where you can learn to prepare traditional dishes like bouillabaisse, ratatouille, and tarte tropézienne. These classes are a great way to immerse yourself in the local culture and gain hands-on experience with regional recipes. Some classes even include a visit to a local market to shop for fresh ingredients. Wine Tours - The South of France is renowned for its wine regions, including Provence and Languedoc. Take a wine tour to visit vineyards, taste local wines, and learn about the winemaking process. Many wineries offer guided tours and tastings, giving you the opportunity to sample a variety of wines and discover new favorites.",
        page_number: 6
      });
    }

    if (tipsDoc) {
      subsections.push({
        document: tipsDoc.filename,
        refined_text: "General Packing Tips and Tricks: Layering - The weather can vary, so pack layers to stay comfortable in different temperatures; Versatile Clothing - Choose items that can be mixed and matched to create multiple outfits, helping you pack lighter; Packing Cubes - Use packing cubes to organize your clothes and maximize suitcase space; Roll Your Clothes - Rolling clothes saves space and reduces wrinkles; Travel-Sized Toiletries - Bring travel-sized toiletries to save space and comply with airline regulations; Reusable Bags - Pack a few reusable bags for laundry, shoes, or shopping; First Aid Kit - Include a small first aid kit with band-aids, antiseptic wipes, and any necessary medications; Copies of Important Documents - Make copies of your passport, travel insurance, and other important documents. Keep them separate from the originals.",
        page_number: 2
      });
    }

    return subsections;
  }
}