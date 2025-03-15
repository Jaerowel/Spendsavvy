import { View, Text, FlatList } from "react-native";
import TransactionItem from "./helper/transactionlist";
import { transactions } from "./helper/DummyData"; // Import only transactions

export default function TransactionList() {
  return (
    <View className="flex-1 p-4">
      {/* Title */}
      <Text className="text-2xl font-bold text-white">Transactions</Text>
      <Text className="mb-2 text-sm text-gray-400">
        Today <Text className="font-semibold text-gray-500">November 1</Text>
      </Text>

      {/* Scrollable List */}
      <FlatList
        data={transactions} // Use only transactions data
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }} // Ensures bottom spacing
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
