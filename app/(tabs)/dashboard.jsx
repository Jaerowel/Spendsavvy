import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import BalanceCard from "../components/walletcard";
import TransactionList from "../components/transaction";
import { MOCK_DASHBOARD_DATA, generateFinancialSummary } from "../Dummydata";

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

  useEffect(() => {
    // Simulate loading data with a delay
    loadDashboardData();
  }, []);
  
  const loadDashboardData = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Process the mock data
        setDashboardData({
          balance: MOCK_DASHBOARD_DATA.balance,
          income: MOCK_DASHBOARD_DATA.income,
          expenses: MOCK_DASHBOARD_DATA.expenses,
          transactions: MOCK_DASHBOARD_DATA.recentTransactions,
          savingsRate: MOCK_DASHBOARD_DATA.savingsRate,
          summary: generateFinancialSummary(MOCK_DASHBOARD_DATA)
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1 second delay to simulate loading
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
      {isLargeScreen ? (
        // Tablet and desktop layout
        <View className="flex-1 flex-row">
          {/* Left column for balance card */}
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
          
          {/* Right column for transactions */}
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
        // Mobile layout (single column)
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
            onRefresh={loadDashboardData}/>
          </View>
        </ScrollView>
      )}
    </View>
  );
}