import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import BalanceCard from "../components/walletcard";
import TransactionList from "../components/transaction";
import { fetchDashboardData } from "../services/dashboardService";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const isExtraLargeScreen = width >= 1280;
  
  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    transactions: [],
    savingsRate: 0,
    summary: "Loading your financial data..."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchDashboardData();
      
      setDashboardData({
        balance: data.balance || 0,
        income: data.income || 0,
        expenses: data.expenses || 0,
        transactions: data.recentTransactions || [],
        savingsRate: data.savingsRate || 0,
        summary: generateSummary(data)
      });
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError("Failed to load your financial data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateSummary = (data) => {
    if (!data) return "Add transactions to see your financial summary.";
    
    const { savingsRate, balance, expenses } = data;
    
    if (savingsRate > 0) {
      return `Your spending is on track this month. You've saved ${savingsRate}% more compared to last month.`;
    } else if (savingsRate < 0) {
      return `Your spending has increased by ${Math.abs(savingsRate)}% compared to last month. Consider reviewing your budget.`;
    } else if (expenses === 0) {
      return "No expenses recorded this month. Start tracking your spending to get insights.";
    } else {
      return "Your spending is stable compared to last month.";
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0E1D12] justify-center items-center">
        <ActivityIndicator size="large" color="#7BE495" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0E1D12]">
      {error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center mb-4">{error}</Text>
          <Text 
            className="text-white bg-[#1A2F1E] px-4 py-2 rounded-lg" 
            onPress={loadDashboardData}
          >
            Try Again
          </Text>
        </View>
      ) : isLargeScreen ? (
        <View className="flex-1 flex-row">
          <View className={`${isExtraLargeScreen ? 'w-1/3' : 'w-1/2'} p-4`}>
            <View className="items-center">
              <BalanceCard 
                balance={dashboardData.balance}
                income={dashboardData.income}
                expenses={dashboardData.expenses}
              />
            </View>
            
            <View className="bg-[#1A2F1E] rounded-lg p-4 mt-6">
              <Text className="text-white text-lg font-semibold mb-2">Financial Summary</Text>
              <Text className="text-gray-400 text-sm">
                {dashboardData.summary}
              </Text>
            </View>
          </View>
          
          <View className={`${isExtraLargeScreen ? 'w-2/3' : 'w-1/2'} p-4`}>
            <View className="flex-1">
              <TransactionList 
                transactions={dashboardData.transactions}
                onRefresh={loadDashboardData}
              />
            </View>
          </View>
        </View>
      ) : (
        <ScrollView className="flex-1 pt-2">
          <View className="items-center mt-6 mb-4">
            <BalanceCard 
              balance={dashboardData.balance}
              income={dashboardData.income}
              expenses={dashboardData.expenses}
            />
          </View>
          
          <View className="px-4 bg-[#1A2F1E] mx-4 rounded-lg p-3 mb-4">
            <Text className="text-white font-semibold mb-1">Financial Summary</Text>
            <Text className="text-gray-400 text-xs mb-2">
              {dashboardData.summary}
            </Text>
          </View>
          
          <View className="flex-1 mb-20">
            <TransactionList 
              transactions={dashboardData.transactions}
              onRefresh={loadDashboardData}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}