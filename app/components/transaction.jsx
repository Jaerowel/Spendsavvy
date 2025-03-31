import { View, Text, FlatList, ActivityIndicator } from "react-native";
import TransactionItem from "./helper/transactionlist";
import useTransactions from "../components/hooks/usetransactions";

export default function TransactionList() {
  const { transactions, loading, error } = useTransactions();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {/* Title */}
      <Text className="text-2xl font-bold text-white">Transactions</Text>
      <Text className="mb-2 text-sm text-gray-400">
        Today <Text className="font-semibold text-gray-500">March 31</Text>
      </Text>

      {/* Scrollable List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id} // Use `_id` from the backend
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }} // Ensures bottom spacing
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
