import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import BalanceCard from "../components/walletcard";
import TransactionList from "../components/transaction";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const isExtraLargeScreen = width >= 1280;

  return (
    <View className="flex-1 bg-[#0E1D12]">
      {/* Responsive layout based on screen size */}
      {isLargeScreen ? (
        // Tablet and desktop layout
        <View className="flex-1 flex-row">
          {/* Left column for balance card */}
          <View className={`${isExtraLargeScreen ? 'w-1/3' : 'w-1/2'} p-4`}>
            <View className="items-center">
              <BalanceCard />
            </View>
            
            <View className="bg-[#1A2F1E] rounded-lg p-4 mt-6">
              <Text className="text-white text-lg font-semibold mb-2">Financial Summary</Text>
              <Text className="text-gray-400 text-sm">
                Your spending is on track this month. You've saved 15% more compared to last month.
              </Text>
            </View>
          </View>
          
          {/* Right column for transactions */}
          <View className={`${isExtraLargeScreen ? 'w-2/3' : 'w-1/2'} p-4`}>
            <View className="flex-1">
              <TransactionList />
            </View>
          </View>
        </View>
      ) : (
        // Mobile layout (single column)
        <ScrollView className="flex-1 pt-2">
          <View className="items-center mt-6 mb-4">
            <BalanceCard />
          </View>
          
          <View className="px-4 bg-[#1A2F1E] mx-4 rounded-lg p-3 mb-4">
            <Text className="text-white font-semibold mb-1">Financial Summary</Text>
            <Text className="text-gray-400 text-xs mb-2">
              Your spending is on track this month. You've saved 15% more compared to last month.
            </Text>
          </View>
          
          <View className="flex-1 mb-20">
            <TransactionList />
          </View>
        </ScrollView>
      )}
    </View>
  );
}