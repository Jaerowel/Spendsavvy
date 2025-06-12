import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TransactionItem from "./helper/transactionlist";
// Import mock service instead of real API
import { fetchTransactions } from "../services/mockService";

// Empty list component with animation
const EmptyTransactionList = () => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      className="items-center justify-center py-16" 
      style={{ opacity: fadeAnim }}
    >
      <View className="bg-[#2A3F2E] p-5 rounded-full mb-4">
        <Ionicons name="receipt-outline" size={40} color="#7BE495" />
      </View>
      <Text className="text-white font-medium text-lg">No Transactions</Text>
      <Text className="text-gray-400 text-center mt-2 px-10 leading-5">
        Your financial journey starts here. Add your first transaction to begin tracking.
      </Text>
      <TouchableOpacity
        className="mt-6 bg-[#2A3F2E] py-3 px-6 rounded-full"
        onPress={() => console.log("Add transaction")}
      >
        <Text className="text-[#7BE495] font-medium">Add Transaction</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Filter pill button component
const FilterPill = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-3 border ${
      active 
        ? "bg-[#7BE495] border-[#7BE495]" 
        : "bg-[#2A3F2E] border-[#384A3C]"
    }`}
  >
    <Text
      className={`font-medium ${
        active ? "text-[#0E1D12]" : "text-gray-300"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// Section header component
const SectionHeader = ({ title, subtitle }) => (
  <View className="mb-5">
    <Text className="text-xl font-bold text-white">{title}</Text>
    {subtitle && (
      <Text className="text-sm text-gray-400 mt-1">{subtitle}</Text>
    )}
  </View>
);

// Main transaction list component
export default function TransactionList({ transactions = [], onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);
  const [localTransactions, setLocalTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Use provided transactions or load from mock
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setLocalTransactions(transactions);
      setIsLoading(false);
    } else {
      // If no transactions provided, load from mock
      loadTransactions();
    }
  }, [transactions]);

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      // Use mock service instead of real API
      const data = await fetchTransactions();
      setLocalTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      if (onRefresh) {
        // Use parent's refresh function if provided
        await onRefresh();
      } else {
        // Otherwise use local refresh with mock data
        await loadTransactions();
      }
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter transactions based on selected filter
  const filteredTransactions =
    activeFilter === "all"
      ? localTransactions
      : localTransactions.filter((t) => t.type === activeFilter);

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  if (isLoading) {
    return (
      <View className="bg-[#1A2F1E] rounded-xl p-6 w-full flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7BE495" />
        <Text className="text-gray-400 mt-4">Loading transactions...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1A2F1E', '#182A1C']}
      className="rounded-xl p-6 w-full flex-1 shadow-lg"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header with title and date */}
      <SectionHeader 
        title="Recent Activity" 
        subtitle={`Today, ${today}`}
      />

      {/* Filter section */}
      <View className="flex-row mb-6">
        <FilterPill
          label="All"
          active={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
        />
        <FilterPill
          label="Income"
          active={activeFilter === "income"}
          onPress={() => setActiveFilter("income")}
        />
        <FilterPill
          label="Expense"
          active={activeFilter === "expense"}
          onPress={() => setActiveFilter("expense")}
        />
      </View>

      {/* Transaction list */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View 
            style={{
              opacity: 1,
              transform: [{ 
                translateY: 0
              }]
            }}
          >
            <TransactionItem 
              item={item} 
              isLast={index === filteredTransactions.length - 1}
            />
          </Animated.View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#7BE495"
            colors={["#7BE495"]}
            progressBackgroundColor="#1A2F1E"
          />
        }
        ListEmptyComponent={<EmptyTransactionList />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-[#2A3F2E] my-2" />
        )}
      />

      {/* Bottom action button */}
      {localTransactions.length > 0 && (
        <View className="mt-4 border-t border-[#2A3F2E] pt-4">
          <TouchableOpacity
            className="bg-[#2A3F2E] py-3 rounded-full flex-row items-center justify-center"
            onPress={() => console.log("See all transactions")}
          >
            <Text className="text-[#7BE495] font-medium mr-2">View All Transactions</Text>
            <Ionicons name="arrow-forward" size={16} color="#7BE495" />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}