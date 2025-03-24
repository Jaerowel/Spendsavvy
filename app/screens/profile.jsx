import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import ProfileButtonHandlers from "../components/PbHandlers";
import ProfileImage from "../components/profileImage";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEditPress = () => {
    console.log("Edit profile image tapped!");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");

        // Get JWT token from storage (assuming you stored it during login)
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://192.168.1.5:3000/api/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // <-- Important!
          },
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response text:", errorText);
          Alert.alert("Error", `Server responded with status ${response.status}`);
          setLoading(false);
          return;
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Fetched profile:", data);
          setUserData(data);
        } else {
          const errorText = await response.text();
          console.error("Unexpected content type:", errorText);
          Alert.alert("Error", "Received unexpected response from the server.");
        }

      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Network Error", "Could not fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View className="flex-1 bg-[#0E1D12] flex-grow">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-center items-center px-4">
          {/* Profile Image Component */}
          <ProfileImage
            imageUrl={
              userData?.profileImage ||
              "https://randomuser.me/api/portraits/women/44.jpg"
            }
            onEditPress={handleEditPress}
          />

          {/* User Name or Email */}
          {loading ? (
            <ActivityIndicator size="large" color="#00ff00" className="mt-4" />
          ) : (
            <Text className="mb-1 mt-4 text-2xl font-bold text-white">
              {userData?.name || userData?.email || "No User Found"}
            </Text>
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
