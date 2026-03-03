import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getMapData() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Provide the latitude and longitude for these Cancun resorts: Garza Blanca Resort & Spa Cancun, Villa del Palmar Cancun, AVA Resort Cancun, Hyatt Ziva Cancun, The Grand at Moon Palace. Also provide coordinates for Cancun International Airport, Downtown Cancun, and Isla Mujeres Ferry (Puerto Juarez). Return as JSON.",
    config: {
      tools: [{ googleMaps: {} }],
      // responseMimeType: "application/json" is NOT allowed with googleMaps tool
    }
  });

  // Since I can't use responseMimeType with googleMaps, I'll just ask for a structured response and parse it.
  // Actually, I'll just hardcode the coordinates for reliability in this specific case since they are static, 
  // but I'll use the tool to verify them first.
  return response.text;
}
