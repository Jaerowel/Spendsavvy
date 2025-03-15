import { View, Text, Image, TouchableOpacity } from "react-native";
import { Bell, MoreVertical, LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Header() {
  const router = useRouter(); // Get router instance
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    console.log("Logging out..."); // Debugging
    setShowMenu(false);
    router.replace("/Loginauth/Login"); // Ensure the correct path
  };

  return (
    <View className="flex-row items-center justify-between bg-[#0E1D12] px-4 py-3">
      {/* Left: Profile Image + Text */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          className="h-12 w-12 rounded-full border-2 border-white"
        />
        <View className="ml-3">
          <Text className="text-lg font-semibold text-white">
            Welcome back!
          </Text>
          <Text className="text-sm text-gray-400">Billy Joe Chungus</Text>
        </View>
      </View>

      {/* Right: Notification & Menu Icons */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity>
          <Bell size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <MoreVertical size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {showMenu && (
        <View className="absolute right-4 top-16 rounded-md bg-white p-2 shadow-md">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center space-x-2"
          >
            <LogOut size={20} color="black" />
            <Text className="text-black">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
