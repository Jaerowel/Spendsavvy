import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ArrowRight } from "lucide-react-native";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  return (
    <View className="flex-row items-center mt-4 pb-4">
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Ask AI about your finances..."
        placeholderTextColor="#aaa"
        className="flex-1 bg-[#141516] p-4 rounded-full border-2 border-gray-700 text-white h-16"
      />
      <TouchableOpacity
        onPress={() => {
          onSend(input);
          setInput("");
        }}
        className="bg-green-400 w-12 h-12 rounded-full justify-center items-center ml-3"
      >
        <ArrowRight size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
