import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function TransactionScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#0E1D12]">
      <Text className="text-white text-lg font-bold">TransactionScreen</Text>
      <Button title="Back to Home" onPress={() => router.push("/")} />
    </View>
  );
}
