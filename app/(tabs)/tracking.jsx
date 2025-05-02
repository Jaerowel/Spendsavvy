import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import PieChart from "../components/Chart"; 
import SpendingCategoriesCard from "../components/spendingcat";

export default function Tracking() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const isExtraLargeScreen = width >= 1280;

  const chartData = [
    { percentage: 45, color: "#FF6B6B", label: "Food" },
    { percentage: 25, color: "#4ECDC4", label: "Transport" },
    { percentage: 15, color: "#45B7D1", label: "Shopping" },
    { percentage: 15, color: "#96CEB4", label: "Others" }
  ];

  return (
    <View className="flex-1 bg-[#0E1D12]">
      {isLargeScreen ? (
        // Tablet and desktop layout with side-by-side components
        <View className="flex-1 flex-row">
          {/* Left section for chart */}
          <View className={`${isExtraLargeScreen ? 'w-1/2' : 'w-1/2'} p-4`}>
            <View className={`items-center ${isExtraLargeScreen ? 'mt-8' : 'mt-4'}`}>
              <PieChart
                data={chartData}
                size={isExtraLargeScreen ? 300 : 250}
              />
            </View>
            
            <View className="bg-[#1A2F1E] rounded-lg p-4 mt-6">
              <Text className="text-white text-lg font-semibold mb-2">Spending Insights</Text>
              <Text className="text-gray-400 text-sm">
                Your biggest expense category is Food (45%). Consider setting a budget limit for this category.
              </Text>
            </View>
          </View>
          
          {/* Right section for spending categories */}
          <View className={`${isExtraLargeScreen ? 'w-1/2' : 'w-1/2'} p-4`}>
            <View className="flex-1">
              <SpendingCategoriesCard />
            </View>
          </View>
        </View>
      ) : (
        // Mobile layout with stacked components
        <ScrollView className="flex-1">
          <View className="items-center mt-8">
            <PieChart data={chartData} size={200} />
          </View>
          
          <View className="mx-4 my-4 bg-[#1A2F1E] rounded-lg p-3">
            <Text className="text-white font-semibold mb-1">Spending Insights</Text>
            <Text className="text-gray-400 text-xs mb-2">
              Your biggest expense category is Food (45%). Consider setting a budget limit for this category.
            </Text>
          </View>
          
          <View className="flex-1 items-center mb-20">
            <SpendingCategoriesCard />
          </View>
        </ScrollView>
      )}
    </View>
  );
}