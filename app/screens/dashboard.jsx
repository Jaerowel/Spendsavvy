import { View } from "react-native";
import BalanceCard from "../components/walletcard";
import Header from "../components/header";

export default function Dashboard() {
  return (
    <View className="flex-1 bg-[#0E1D12]">
      <Header />
      <View className="items-center mt-4">
        <BalanceCard />
      </View>
    </View>
  );
}
