import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { PiggyBank, HeartPulse, Bitcoin, LineChart } from "lucide-react-native";

const questions = [
  { id: 1, text: "How can I improve my savings?", icon: <PiggyBank size={20} color="#fff" /> },
  { id: 2, text: "What’s my current financial health?", icon: <HeartPulse size={20} color="#fff" /> },
  { id: 3, text: "Should I invest in BTC?", icon: <Bitcoin size={20} color="#fff" /> },
  { id: 4, text: "Should I rebalance my portfolio?", icon: <LineChart size={20} color="#fff" /> },
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <FlatList
      data={questions}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      className="mb-4"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item.text)}
          className="flex-1 m-1 p-4 bg-[#161D1A] rounded-lg flex-row items-center"
        >
          {item.icon}
          <Text className="text-white ml-2">{item.text}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
