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
    <View className="mt-10 w-full flex-grow rounded-3xl bg-[#2D2D2D] p-6">
      <Text className="mb-4 text-lg font-bold text-white">
        Spending categories
      </Text>
      <View className="flex-row flex-wrap justify-between">
        {categories.map((item, index) => (
          <View
            key={index}
            className="mb-3 w-[47%] rounded-3xl bg-[#3A3A3A] p-4"
          >
            <Text className="font-bold text-white">{item.amount}</Text>
            <Text className="text-right text-white">{item.percentage}</Text>
            <Text className="mt-1 text-sm text-gray-400">{item.label}</Text>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }} // Replace with real icon
              className="mr-3 h-10 w-10 rounded-full"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SpendingCategoriesCard;
