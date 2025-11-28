import { GoogleGenAI } from "@google/genai";
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from "react";

const GEMINI_KEY = Constants.expoConfig?.extra?.GEMINI_API_KEY ?? "";

export default function TabTwoScreen() {

  const ai = new GoogleGenAI({apiKey: GEMINI_KEY});

  const [result, setResult] = useState("");


    useEffect(() => {

      async function main() {
        try {

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
          });

          console.log(response.text);
          setResult(response.text ?? "")

        } catch (error) {
          console.log("GEMINI ERROR:", error)
        }

      }
      main()

    }, [])


  return (
    <View>
      <Text>{result}</Text>

    </View>

  
  )
}

const styles = StyleSheet.create({
});
