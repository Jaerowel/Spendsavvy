import { View } from "react-native";
import BalanceCard from "../components/walletcard";
import Header from "../components/header";
import TransactionList from "../components/transaction";

export default function Dashboard() {
  return (
    <View className="flex-1 bg-[#0E1D12]">
      <View className="items-center mt-8">
        <BalanceCard />
      </View>
    <View className=" flex-1 item-center ">
      <TransactionList/>
    </View>
    </View>
  );
}
