import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import ProfileButtonHandlers from "../components/PbHandlers";
import ProfileImage from "../components/profileImage";

export default function ProfileScreen() {
  const router = useRouter();

  const handleEditPress = () => {
    console.log("Edit profile image tapped!");

  };

  return (
    <View className="flex-1 bg-[#0E1D12]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mt-10 justify-center items-center px-4">
          {/* Profile Image Component */}
          <ProfileImage
            imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
            onEditPress={handleEditPress}
          />

          {/* User Name */}
          <Text className="mb-1 mt-4 text-2xl font-bold text-white">
            Billy Joe Chungus
          </Text>

          {/* Buttons */}
          <View className="mt-8 h-[50%] w-full">
            <ProfileButtonHandlers />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
