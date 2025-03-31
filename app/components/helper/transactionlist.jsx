import { View, Text, Image } from "react-native";
import { format, parse } from "date-fns"; // Import `parse` for custom date parsing

export default function TransactionItem({ item }) {
  // Safely format the date
  let formattedDate = "No Date"; // Default fallback value
  if (item.date) {
    try {
      // Attempt to parse the date
      const parsedDate = parse(item.date, "MM/dd/yyyy", new Date()); // Parse non-ISO date format
      formattedDate = format(parsedDate, "MMM dd, yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
    }
  }

  return (
    <View className="flex-row items-center justify-between bg-[#333] p-4 rounded-lg mb-2">
      {/* Left Side: Icon + Details */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with a real icon if available
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="text-white font-semibold">{item.category}</Text>
          <Text className="text-gray-400">{item.description || "No description"}</Text>
        </View>
      </View>

      {/* Right Side: Amount + Date */}
      <View className="items-end">
        <Text className="text-white font-bold">{`-${item.amount} PHP`}</Text>
        <Text className="text-gray-400 text-xs">{formattedDate}</Text>
      </View>
    </View>
  );
}
