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
      // Adobe Acrobat learning materials for HR forms
      'Learn Acrobat - Fill and Sign.pdf': `
        Creating and Managing Fillable Forms in Adobe Acrobat
        
        Form Field Types and Setup
        Adobe Acrobat provides comprehensive tools for creating interactive forms essential for HR processes. Text fields allow employees to enter personal information, contact details, and responses to open-ended questions. Dropdown menus streamline data entry by providing predefined options for departments, job titles, and employment classifications.
        
        Checkbox Implementation
        Checkboxes are crucial for HR forms, enabling employees to select multiple options for benefits enrollment, policy acknowledgments, and compliance certifications. Radio buttons work well for single-choice selections like employment status or preferred communication methods.
        
        Form Validation and Security
        Implement field validation to ensure data accuracy and completeness. Required fields prevent form submission without critical information, while format validation ensures proper entry of phone numbers, email addresses, and identification numbers.
      `,
      'Learn Acrobat - Create and Convert_1.pdf': `
        Document Creation and Form Setup for HR Professionals
        
        Template Development
        Start with professional templates designed for HR documentation. Employment applications, performance review forms, and policy acknowledgment documents require consistent formatting and branding. Customize templates with company logos, color schemes, and specific field requirements.
        
        Conversion Capabilities
        Convert existing Word documents and Excel spreadsheets into interactive PDF forms while maintaining formatting integrity. This process preserves complex layouts, tables, and formatting elements essential for professional HR documentation.
        
        Version Control Systems
        Establish clear naming conventions and version control for HR forms. Track changes, updates, and revisions to ensure compliance with current regulations and company policies.
      `,
      'Learn Acrobat - Request e-signatures_1.pdf': `
        Electronic Signature Workflows for HR Compliance
        
        Signature Field Configuration
        Set up signature fields in strategic locations on employment contracts, offer letters, and policy acknowledgments. Configure multiple signature fields for different parties including employees, managers, and HR representatives.
        
        Workflow Automation
        Establish signature routing and approval processes for complex HR documentation. Automated reminders ensure timely completion of signature processes, maintaining momentum in onboarding and compliance workflows.
        
        Legal Compliance Features
        Electronic signatures must meet legal requirements for employment documentation. Implement audit trails that track signature timestamps, IP addresses, and authentication methods for comprehensive compliance records.
      `,
      'Learn Acrobat - Share_1.pdf': `
        Form Distribution and Sharing Strategies
        
        Secure Distribution Methods
        Create secure sharing links for sensitive HR documents with password protection and access controls. Role-based permissions ensure appropriate access levels for different types of HR documentation.
        
        Collaboration Features
        Enable real-time collaboration on forms requiring input from multiple departments. Set up review and approval workflows for form updates and establish shared workspaces for HR team collaboration.
        
        Access Management
        Implement time-limited access for temporary forms like exit interviews and performance reviews. Monitor form access and completion rates to optimize HR processes and identify bottlenecks.
      `,
      'Learn Acrobat - Export_1.pdf': `
        Data Export and Management for HR Analytics
        
        Export Format Options
        Export form data to Excel spreadsheets for comprehensive analysis and reporting. Generate CSV files for seamless integration with HR information systems and payroll platforms.
        
        Data Processing Capabilities
        Aggregate responses from multiple forms to identify trends and patterns in employee data. Filter and sort information based on specific criteria like department, hire date, or performance metrics.
        
        Automation and Integration
        Set up scheduled exports for regular reporting requirements and create automated data feeds to payroll and benefits systems. Establish robust backup procedures for critical HR data preservation.
      `,
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