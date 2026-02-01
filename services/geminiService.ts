import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Item, AIAnalysisResult } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeImage = async (base64Image: string): Promise<AIAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this lost/found item image. 
            Identify the category (e.g., Wallet, Phone, Keys, Backpack).
            Extract any visible text (OCR) such as names, brands, or ID numbers.
            Describe the item's appearance (color, material, condition).
            
            Return JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            detectedText: { type: Type.STRING, nullable: true },
            colors: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["category", "description", "colors"]
        } as Schema
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    return {
      category: "Unidentified Item",
      description: "Unable to analyze image automatically. Please add details manually.",
      detectedText: null,
      colors: ["Unknown"]
    };
  }
};

export const searchItems = async (query: string, availableItems: Item[]): Promise<{ id: string; confidence: number; reason: string }[]> => {
  try {
    const itemsContext = availableItems.map(item => ({
      id: item.id,
      category: item.category,
      description: item.description,
      detectedText: item.detectedText,
      location: item.location,
      date: item.date
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `User is searching for a lost item with description: "${query}".
          
          Here is the database of found items:
          ${JSON.stringify(itemsContext)}
          
          Analyze the semantic similarity between the user's search and the found items.
          Consider typos, synonyms (e.g., "spectacles" vs "glasses"), and extracted text matches (e.g. name on ID).
          
          Return a JSON object containing a list of matches.
          Only include items with a confidence score > 0.
          Sort by confidence descending.`
        }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  confidence: { type: Type.NUMBER, description: "0 to 100" },
                  reason: { type: Type.STRING, description: "Short explanation of why this matches" }
                },
                required: ["id", "confidence", "reason"]
              }
            }
          }
        } as Schema
      }
    });

    const result = JSON.parse(response.text || '{"matches": []}');
    return result.matches || [];

  } catch (error) {
    return [];
  }
};