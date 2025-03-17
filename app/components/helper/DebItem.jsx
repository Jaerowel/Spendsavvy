import { View, Text, Image } from "react-native";

export default function DebtItem({ item }) {
  return (
    <View className="flex-row items-center justify-between bg-[#333] p-4 rounded-lg mb-3">
      {/* Left Side: Person + Details */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Placeholder for now
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="text-white font-semibold">{item.category}</Text>
          <Text className="text-gray-400">{item.description}</Text>
        </View>
      </View>

      {/* Right Side: Amount + Date */}
      <View className="items-end">
        <Text className="text-white font-bold">{`₱${item.amount}`}</Text>
        <Text className="text-gray-400 text-xs">{item.date}</Text>
      </View>
    </View>
  );
}
