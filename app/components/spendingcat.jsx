import React from "react";
import { View, Text, Image } from "react-native";

const categories = [
  { amount: "800PHP", percentage: "37%", label: "Utilities" },
  { amount: "4000PHP", percentage: "45%", label: "Payments" },
  { amount: "200PHP", percentage: "29%", label: "Subscription" },
  { amount: "500PHP", percentage: "41%", label: "Expenses" },
];

const SpendingCategoriesCard = () => {
  return (
    <View className="bg-[#2D2D2D] rounded-3xl p-6 mt-10  flex-grow w-full">
      <Text className="text-white text-lg font-bold mb-4">Spending categories</Text>
      <View className="flex-row flex-wrap justify-between">
        {categories.map((item, index) => (
          <View
            key={index}
            className="bg-[#3A3A3A] rounded-3xl p-4 w-[47%] mb-3"
          >
            <Text className="text-white font-bold">{item.amount}</Text>
            <Text className="text-white text-right">{item.percentage}</Text>
            <Text className="text-gray-400 text-sm mt-1">{item.label}</Text>
            <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with real icon
          className="w-10 h-10 rounded-full mr-3"
        />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SpendingCategoriesCard;
