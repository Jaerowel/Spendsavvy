import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DebtHeader = ({ onAddPress }) => {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-2xl font-bold text-white">Debt List</Text>
      <TouchableOpacity
        onPress={onAddPress}
        className="bg-green-600 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold">Add Debt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DebtHeader;