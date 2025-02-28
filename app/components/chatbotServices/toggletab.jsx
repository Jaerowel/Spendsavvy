import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ToggleTabs({ activeTab, setActiveTab }) {
  return (
    <View className="flex-row mb-5 mt-5 bg-[#11221C] rounded-full p-1">
      {["Chat", "Goal tracking"].map((tab, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-1 p-4 rounded-full items-center ${
            activeTab === tab ? "bg-green-400" : "bg-transparent"
          }`}
          onPress={() => setActiveTab(tab)}
        >
          <Text className={`font-bold text-lg ${activeTab === tab ? "text-black" : "text-white"}`}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
