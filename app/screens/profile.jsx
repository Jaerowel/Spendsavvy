import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#0E1D12]">
    <Header/>
    </View>
  );
}
