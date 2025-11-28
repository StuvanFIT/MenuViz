import { GoogleGenAI, Type } from "@google/genai";
import Constants from 'expo-constants';

//Prompts
import { parseMenuImagePrompt } from "@/prompts/prompts";


const GEMINI_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY ?? "";

const getAI = () => new GoogleGenAI({apiKey: GEMINI_KEY});

/*
Parses menu item into structured data using Gemini 2.5 Flash
 */

export const parseMenuItemFromImage = async (base64Image: string) => {
    const ai = getAI();

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
                    { text: parseMenuImagePrompt }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.STRING },
                            dietaryTags: { 
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ['name', 'description']
                    }
                }
            }



        })
    }
}


/*
Generates an image for the specific dish using Gemini 2.5 Flash
*/

export const generateMenuItemImage = () => {

}