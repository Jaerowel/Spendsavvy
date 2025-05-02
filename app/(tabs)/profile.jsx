import React from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import ProfileButtonHandlers from "../components/PbHandlers";
import ProfileImage from "../components/profileImage";
import useProfile from "../components/hooks/useProfile";

export default function ProfileScreen() {
  const router = useRouter();
  // Use the custom hook instead of useState and useEffect
  const { profile, loading, error, updateProfile } = useProfile();

  // Handle profile image edit
  const handleEditPress = () => {
    console.log("Edit profile image tapped!");
    // You could navigate to an image picker or editor here
    // Or implement the uploadProfilePhoto function from the hook
  };  

  // Show error alert if there's an error
  if (error) {
    Alert.alert("Error", error);
  }

  return (
    <View className="flex-1 bg-[#0E1D12] flex-grow">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-center items-center px-4">
          {/* Profile Image Component */}
          <ProfileImage
            imageUrl={
              profile?.profileImage ||
              "https://randomuser.me/api/portraits/women/44.jpg"
            }
            onEditPress={handleEditPress}
          />

          {/* User Name or Email */}
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" className="mt-4" />
          ) : (
            <Text className="mb-1 mt-4 text-2xl font-bold text-white">
              {profile?.name || profile?.email || "No User Found"}
            </Text>
          )}

          {/* Add more profile information */}
          {!loading && profile && (
            <View className="w-full mt-4 bg-[#1A2F1E] p-4 rounded-lg">
              <Text className="text-gray-400">Email</Text>
              <Text className="text-white mb-4">{profile.email || "N/A"}</Text>
              
              {profile.username && (
                <>
                  <Text className="text-gray-400">Username</Text>
                  <Text className="text-white mb-4">{profile.username}</Text>
                </>
              )}
              
              {/* Add other profile fields as needed */}
            </View>
          )}

          {/* Buttons */}
          <View className="mt-8 h-[50%] w-full">
            <ProfileButtonHandlers />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}