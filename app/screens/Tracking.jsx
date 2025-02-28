import { View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";
import PieChart from "../components/Chart"; // Ensure correct casing
import SpendingCategoriesCard from "../components/spendingcat";
export default function trackingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0E1D12]">
      <Header />
      <View className="items-center mt-8">
      <PieChart
  data={[
    { percentage: 41, color: "#7BE495", angle: -45, position: { top: 15, right: 40 } },
    { percentage: 45, color: "#6ADF93", angle: 30, position: { bottom: 30, right: 20 } },
    { percentage: 37, color: "#55D881", angle: 120, position: { bottom: 10, left: 40 } },
    { percentage: 29, color: "#36C167", angle: 200, position: { top: 30, left: 20 } },
  ]}
/>

      </View>
      <View className="flex-1 items-center mt-10">
       <SpendingCategoriesCard/>
      </View>
    </View>
  );
}

