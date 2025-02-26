import { View, Text, Image, TouchableOpacity } from "react-native";
import { Bell, MoreVertical } from "lucide-react-native";

export default function Header() {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-[#0E1D12]">
      {/* Left: Profile Image + Text */}
      <View className="flex-row items-center">
        <Image 
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} // Replace with real image
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <View className="ml-3">
          <Text className="text-white text-lg font-semibold">Welcome back!</Text>
          <Text className="text-gray-400 text-sm">Billy Joe Chungus</Text>
        </View>
      </View>

      {/* Right: Notification & Menu Icons */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity>
          <Bell size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreVertical size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
