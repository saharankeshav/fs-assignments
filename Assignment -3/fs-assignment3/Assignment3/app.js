import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const API_KEY = "YOUR_GEMINI_API_KEY";

  const askGemini = async () => {
    try {

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      setResponse(
        data.candidates[0].content.parts[0].text
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Gemini AI Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Ask something..."
        value={prompt}
        onChangeText={setPrompt}
      />

      <Button title="Ask Gemini" onPress={askGemini} />

      <Text style={styles.response}>{response}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});