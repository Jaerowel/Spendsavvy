import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import DebtItem from "../components/helper/DebItem";
import { debts } from "../components/helper/DummyData";
import { useRouter } from "expo-router";

export default function DebtScreen() {
  const router = useRouter();

  const handleAddDebt = () => {
    console.log("Add new debt tapped!");
    // router.push('/add-debt'); // Uncomment this if you have a route
  };

  return (
    <View className="flex-1 bg-[#0E1D12] p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-white">Debt List</Text>
        <TouchableOpacity
          onPress={handleAddDebt}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Add Debt</Text>
        </TouchableOpacity>
      </View>

      {/* Debt Items */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {debts.map((debt) => (
          <DebtItem key={debt.id} item={debt} />
        ))}
      </ScrollView>
    </View>
  );
}
