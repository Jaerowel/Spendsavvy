import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function ChatMessages({ messages }) {
  return (
    <ScrollView className="flex-1 mb-4">
      {messages.map((msg, index) => (
        <View
          key={index}
          className={`max-w-[75%] p-3 rounded-lg mb-2 ${msg.role === "user" ? "bg-green-400 self-end" : "bg-[#161D1A] self-start"}`}
        >
          <Text className={`${msg.role === "user" ? "text-black" : "text-white"}`}>{msg.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
