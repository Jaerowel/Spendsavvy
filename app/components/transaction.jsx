import { View, Text, FlatList } from "react-native";
import TransactionItem from "./helper/transactionlist";
import { transactions } from "./helper/DummyData"; // Import only transactions

export default function TransactionList() {
  return (
    <View className="flex-1 p-4"> 
      {/* Title */}
      <Text className="text-white text-2xl font-bold">Transactions</Text>
      <Text className="text-gray-400 text-sm mb-2">
        Today <Text className="text-gray-500 font-semibold">November 1</Text>
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
