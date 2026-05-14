
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLatestTechBriefing = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Genera un resumen breve de las 3 tendencias más importantes en tecnología, IA y SEO de hoy en español. Usa un tono profesional orientado a crecimiento y desarrollo.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching briefing:", error);
    return "Error al obtener el briefing diario. Inténtalo más tarde.";
  }
};

export const askDevAssistant = async (prompt: string, history: { role: string, content: string }[]) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "Eres el asistente experto de SEOGrowthers. Tu especialidad es la programación, el SEO técnico, la IA y las estrategias de crecimiento digital. Respondes de forma técnica pero enfocada en resultados y escalabilidad. Usa bloques de código si es necesario."
      }
    });
    
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Error in DevAssistant:", error);
    return "Lo siento, tuve un problema procesando tu consulta.";
  }
};
