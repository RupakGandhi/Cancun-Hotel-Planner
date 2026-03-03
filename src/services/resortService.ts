import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function getResortData() {
  const prompt = `
    You are a world-class travel researcher. I have collected some data about 5 resorts in Cancun for a trip from June 17-21, 2026.
    Resorts:
    1. Garza Blanca Resort & Spa Cancun
    2. Villa del Palmar Cancun
    3. AVA Resort Cancun
    4. Hyatt Ziva Cancun
    5. The Grand at Moon Palace

    Based on the provided context and your knowledge, create a structured JSON object for these resorts.
    Include:
    - Name
    - Description
    - Price Range (Budget, Mid-Range, Luxury)
    - Amenities (Pools, Beach, Spa, etc.)
    - Dining (Restaurants, specifically mention vegetarian friendliness)
    - Kids Club / Activities
    - Room Types (especially for families staying together vs separate)
    - Booking Link (use the ones provided in the request)
    - Highlights (why choose this one?)

    Context from research:
    - Garza Blanca: High-end, 3-bedroom lofts available, highly recommended by vegetarians.
    - Villa del Palmar: Budget-friendly, family suites (1-2 bedrooms), diverse dining.
    - AVA Resort: Luxury, all-inclusive, AVA Kids club, oceanfront promise.
    - Moon Palace The Grand: All-inclusive, kids/teens stay free, resort credit, airport transfers.
    - Hyatt Ziva: All-inclusive, family-friendly, dolphin habitat (known feature), multiple pools.

    Return the data as a JSON array of objects.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            priceRange: { type: Type.STRING },
            amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
            dining: {
              type: Type.OBJECT,
              properties: {
                restaurants: { type: Type.ARRAY, items: { type: Type.STRING } },
                vegetarianFriendly: { type: Type.STRING },
              }
            },
            kidsClub: { type: Type.STRING },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } },
            roomOptions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: Type.STRING,
                  capacity: { type: Type.STRING },
                  description: { type: Type.STRING },
                }
              }
            },
            bookingLink: { type: Type.STRING },
            highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["id", "name", "description", "priceRange", "bookingLink"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}
