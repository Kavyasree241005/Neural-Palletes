import { Document } from '../types';

// Since pdf-parse doesn't work in browser, we'll simulate PDF processing
// In a real implementation, this would run on the server side
export class PDFProcessor {
  async extractText(file: File): Promise<string> {
    // Simulate PDF text extraction
    // In production, this would use pdf-parse or similar library on the backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock extracted text based on filename
        const mockContent = this.getMockContent(file.name);
        resolve(mockContent);
      }, 1000);
    });
  }

  private getMockContent(filename: string): string {
    // Mock content for different document types
    const mockContents: Record<string, string> = {
      'South of France - Cities.pdf': `
        Comprehensive Guide to Major Cities in the South of France
        
        Nice - The Pearl of the French Riviera
        Nice is the capital of the Côte d'Azur and one of the most popular destinations in the South of France. The city offers beautiful beaches, a charming old town, and excellent museums. The Promenade des Anglais is perfect for walking and cycling.
        
        Marseille - France's Oldest City
        Marseille is a vibrant port city with a rich history dating back 2,600 years. Visit the Old Port, explore the historic Le Panier district, and take a boat trip to the Château d'If.
        
        Cannes - Festival City
        Famous for its international film festival, Cannes offers luxury shopping, beautiful beaches, and glamorous nightlife. The Boulevard de la Croisette is lined with prestigious hotels and boutiques.
      `,
      'South of France - Things to Do.pdf': `
        Coastal Adventures
        
        The South of France is renowned for its beautiful coastline along the Mediterranean Sea. Here are some activities to enjoy by the sea:
        
        Beach Hopping:
        - Nice: Visit the sandy shores and enjoy the vibrant Promenade des Anglais
        - Antibes: Relax on the pebbled beaches and explore the charming old town
        - Saint-Tropez: Experience the exclusive beach clubs and glamorous atmosphere
        - Marseille to Cassis: Explore the stunning limestone cliffs and hidden coves of Calanques National Park
        
        Water Sports:
        - Cannes, Nice, and Saint-Tropez: Try jet skiing or parasailing for a thrill
        - Toulon: Dive into the underwater world with scuba diving excursions
        - Mediterranean Coast: Charter a yacht or join a sailing tour to explore the coastline
        
        Nightlife and Entertainment
        
        The South of France offers a vibrant nightlife scene, with options ranging from chic bars to lively nightclubs:
        
        Bars and Lounges:
        - Monaco: Enjoy classic cocktails and live jazz at Le Bar Americain
        - Nice: Try creative cocktails at Le Comptoir du Marché
        - Cannes: Experience dining and entertainment at La Folie Douce
        - Saint-Tropez: Relax at Bar du Port, known for its chic atmosphere
        
        Nightclubs:
        - Saint-Tropez: Dance at the famous Les Caves du Roy
        - Nice: Party at High Club on the Promenade des Anglais
        - Cannes: Enjoy the stylish setting at La Suite with rooftop terrace
      `,
      'South of France - Cuisine.pdf': `
        Culinary Experiences
        
        In addition to dining at top restaurants, there are several culinary experiences you should consider:
        
        Cooking Classes:
        Many towns and cities in the South of France offer cooking classes where you can learn to prepare traditional dishes like bouillabaisse, ratatouille, and tarte tropézienne. These classes are a great way to immerse yourself in the local culture.
        
        Wine Tours:
        The South of France is renowned for its wine regions, including Provence and Languedoc. Take a wine tour to visit vineyards, taste local wines, and learn about the winemaking process.
        
        Local Markets:
        Visit the colorful markets in Nice, Antibes, and Aix-en-Provence to sample local produce, cheese, and specialties.
      `,
      'South of France - Tips and Tricks.pdf': `
        General Packing Tips and Tricks
        
        - Layering: The weather can vary, so pack layers to stay comfortable
        - Versatile Clothing: Choose items that can be mixed and matched
        - Packing Cubes: Use packing cubes to organize your clothes
        - Roll Your Clothes: Rolling clothes saves space and reduces wrinkles
        - Travel-Sized Toiletries: Bring travel-sized toiletries to save space
        - Reusable Bags: Pack a few reusable bags for laundry and shopping
        - First Aid Kit: Include a small first aid kit with essentials
        - Copies of Documents: Make copies of passport and important documents
        
        Transportation Tips:
        - Train Travel: The TGV connects major cities efficiently
        - Car Rentals: Perfect for exploring smaller towns and countryside
        - Public Transport: Most cities have excellent bus and tram systems
      `
    };

    return mockContents[filename] || 'Sample document content for processing...';
  }
}