import { View, Text } from "react-native";
import { format, parseISO } from "date-fns"; // Use parseISO for ISO date strings
import { Ionicons } from '@expo/vector-icons';

// Get icon for transaction category
const getCategoryIcon = (category) => {
  const icons = {
    'Food': 'fast-food-outline',
    'Transport': 'car-outline',
    'Entertainment': 'film-outline',
    'Housing': 'home-outline',
    'Utilities': 'flash-outline',
    'Salary': 'cash-outline',
    'Shopping': 'cart-outline',
    'Health': 'medical-outline',
    'Education': 'school-outline',
    'Travel': 'airplane-outline',
    'Gifts': 'gift-outline'
  };
  
  return icons[category] || 'list-outline';
};

// Get color for transaction type
const getTypeColor = (type) => {
  return type === 'income' ? '#7BE495' : '#FF6B6B';
};

// Format currency with sign
const formatCurrency = (amount, type) => {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}$${parseFloat(amount).toFixed(2)}`;
};

export default function TransactionItem({ item }) {
  // Safely format the date from ISO string
  let formattedDate = "No Date";
  if (item.date) {
    try {
      // Parse ISO date string
      const date = parseISO(item.date);
      formattedDate = format(date, "MMM dd, yyyy");
    } catch (error) {
      console.error("Date formatting error:", error);
      
      // Fallback for non-ISO date strings
      try {
        const fallbackDate = new Date(item.date);
        if (!isNaN(fallbackDate.getTime())) {
          formattedDate = format(fallbackDate, "MMM dd, yyyy");
        }
      } catch (fallbackError) {
        console.error("Fallback date formatting error:", fallbackError);
      }
    }
  }

  return (
    <View className="flex-row items-center justify-between bg-[#1A2F1E] p-4 rounded-lg mb-2">
      {/* Left Side: Icon + Details */}
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-[#2A3F2E] items-center justify-center mr-3">
          <Ionicons 
            name={getCategoryIcon(item.category)} 
            size={20} 
            color={getTypeColor(item.type)} 
          />
        </View>
        <View>
          <Text className="text-white font-semibold">{item.description}</Text>
          <Text className="text-gray-400 text-xs">{item.category || "Uncategorized"}</Text>
        </View>
      </View>

      {/* Right Side: Amount + Date */}
      <View className="items-end">
        <Text 
          className={`font-bold ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}
        >
          {formatCurrency(item.amount, item.type)}
        </Text>
        <Text className="text-gray-400 text-xs">{formattedDate}</Text>
      </View>
    </View>
  );
}