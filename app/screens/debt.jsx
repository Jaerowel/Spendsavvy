import { View, Text, Button } from "react-native";
import TransactionList from "../components/transaction";
import { useRouter } from "expo-router";

export default function DebtScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 p-4 bg-[#0E1D12]">
     <TransactionList/>
     
    </View>
  );
}
  