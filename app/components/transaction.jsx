import { View, Text, FlatList } from "react-native";
import TransactionItem from "./helper/transactionlist";
export default function TransactionList() {
  const transactions = [
    { id: "1", category: "Subscription", description: "Figma", amount: 200, date: "11/1/2024" },
    { id: "2", category: "Fast food", description: "Jollibee", amount: 200, date: "11/2/2024" },
    { id: "3", category: "Subscription", description: "Scotetco", amount: 1200, date: "11/1/2024" },
    { id: "4", category: "Subscription", description: "Pldt", amount: 1700, date: "11/1/2024" },
    { id: "6", category: "Subscription", description: "pornhub", amount: 2200, date: "11/1/2024" },
    { id: "7", category: "Subscription", description: "dildo", amount: 2200, date: "11/1/2024" },
    { id: "8", category: "Subscription", description: "powerangers", amount: 2200, date: "11/1/2024" },
    { id: "9", category: "Subscription", description: "dude", amount: 2200, date: "11/1/2024" },
     { id: "10", category: "Subscription", description: "pornhub", amount: 2200, date: "11/1/2024" },
  ];

  return (
    <View className="flex-1 p-4"> 
      {/* Title */}
      <Text className="text-white text-2xl font-bold">Transactions</Text>
      <Text className="text-gray-400 text-sm mb-2">
        Today <Text className="text-gray-500 font-semibold" >November 1</Text>
      </Text>

      {/* Scrollable List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }} // Ensures bottom spacing
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}
