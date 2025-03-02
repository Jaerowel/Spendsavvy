import React, { useState } from "react";
import {  View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text,} from "react-native";
import Header from "../components/header";
import ChatMessages from "../components/chatbotServices/chatmessage";
import SuggestedQuestions from "../components/chatbotServices/suggestedquestions";
import ChatInput from "../components/chatbotServices/chatinput";
import { getChatbotResponse } from "../components/helper/openaiService";
import ToggleTabs from "../components/chatbotServices/toggletab"; // ✅ Import Toggle Component
import GoalTrackingScreen from "../components/chatbotServices/GoalTracking"; // ✅ Import Goal Tracking Screen

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat"); // ✅ Manage active tab

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setShowSuggestions(false);
    setLoading(true);

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await getChatbotResponse(message);
      const aiMessage = { role: "assistant", content: botResponse };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Response Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#0F1D17]"
    >
    {/* Header Container */}
    <View className="mb-4">
            <Header title={activeTab} />
          </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 p-4">
          

          {/* Toggle Tabs */}
          <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          {activeTab === "Chat" ? (
            <View className="flex-1 mb-4">
              <ChatMessages messages={messages} />
              {showSuggestions && (
                <SuggestedQuestions onSelect={handleSendMessage} />
              )}
              {loading && (
                <Text className="text-white text-center mt-2">
                  AI is thinking...
                </Text>
              )}
              <View className="mb-[100px]">
                <ChatInput onSend={handleSendMessage} />
              </View>
            </View>
          ) : (
            <GoalTrackingScreen />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
