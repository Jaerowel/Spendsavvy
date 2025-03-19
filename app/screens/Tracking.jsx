import { View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";
import PieChart from "../components/Chart"; // Ensure correct casing
import SpendingCategoriesCard from "../components/spendingcat";
export default function trackingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0E1D12]">
   
   <View className="items-center mt-20">
        <PieChart
          data={[
            { percentage: 45, color: "#FF6B6B", label: "Food" },
            { percentage: 25, color: "#4ECDC4", label: "Transport" },
            { percentage: 15, color: "#45B7D1", label: "Shopping" },
            { percentage: 15, color: "#96CEB4", label: "Others" }
          ]}
          size={200}
        />
      </View>
      <View className="flex-1 items-center ">
       <SpendingCategoriesCard/>
      </View>
    </View>
  );
}

