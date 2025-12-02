import { GoogleGenAI, Type } from "@google/genai";
import Constants from 'expo-constants';

//Prompts
import { parseMenuImagePrompt } from "@/prompts/prompts";
import { MenuItem } from "@/types/type";


const GEMINI_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY ?? "";

const getAI = () => new GoogleGenAI({apiKey: GEMINI_KEY});

/*
Parses menu item into structured data using Gemini 2.5 Flash
 */

export const parseMenuItemFromImage = async (base64Image: string | null | undefined): Promise<MenuItem[]> => {

    if (!base64Image){
        return [];
    }
    
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
                responseMimeType: 'application/json', //return JSON only
                responseSchema: {
                    //array of objects
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.STRING },
                            category: {type: Type.STRING},
                            dietaryTags: { 
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ['name', 'description', 'category'] // each object must contain these
                    }
                }
            }
        })

        const rawText = response.text

        if(!rawText){
            return []
        }

        const parsedText: any[] = JSON.parse(rawText);

        

        return parsedText.map((item, index) => ({
            id: `item-${index}-${Date.now()}`,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category || [],
            dietaryTags: item.dietaryTags || [],
            imageStatus: 'idle'
        }))

    } catch (error) {
        console.error("Parsing Menu Image Failed:", error);
        throw error;
    }
}


/*
Generates an image for the specific dish using Gemini 2.5 Flash
*/

export const generateMenuItemImage = () => {

}


/*

*/