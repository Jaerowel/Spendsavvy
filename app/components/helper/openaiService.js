import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_COHERE_API_KEY;


export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://api.cohere.com/v1/chat",
      {
        model: "command-r", // You can use "command-r" or "command-r-plus" (for better results)
        message: message, // User input
        chat_history: [], // Optional: Add chat history for context
        temperature: 0.7, // Adjust response randomness
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.text; // Return the response text
  } catch (error) {
    console.error("Error fetching chatbot response:", error.response?.data || error.message);
    return "Sorry, I couldn't process that request.";
  }
};
