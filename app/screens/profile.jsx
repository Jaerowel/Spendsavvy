import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { UserCog,ShieldCheck,Settings } from "lucide-react-native";
import ProfileButton from "../components/profileButton";
import ProfileImage from "../components/profileImage";

export default function ProfileScreen() {
  const router = useRouter();

  const handleChangeAccount = () => {
    console.log("Change account details tapped!");
    // router.push('/account-details');
  };

  const handleAccountRecovery = () => {
    console.log("Account recovery tapped!");
    // router.push('/account-recovery');
  };

  const handleOtherSettings = () => {
    console.log("Other settings tapped!");
    // router.push('/other-settings');
  };
  const handleEditPress = () => {
    console.log("Edit profile image tapped!");
    // You can navigate or open image picker here
  };

  return (
    <View className="flex-1 bg-[#0E1D12]">
     

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mt-10 justify-center items-center px-4  ">
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
            <ProfileButton
              label="Change account details"
              onPress={handleChangeAccount}
              icon={UserCog}
              borderColor="green"
            />

            <ProfileButton
              label="Account Recovery"
              onPress={handleAccountRecovery}
              icon={ShieldCheck}
              borderColor="green"
            />

            <ProfileButton
              label="Other settings"
              onPress={handleOtherSettings}
              icon={Settings}
              borderColor="green"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
