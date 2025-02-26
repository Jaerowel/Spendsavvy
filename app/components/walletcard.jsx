import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BalanceCard() {
  return (
    <View className="relative p-5">
      {/* Main Card */}
      <View className="bg-green-500 rounded-lg p-5 shadow-lg w-80 h-40 justify-center">
        {/* Semi-Transparent Overlay */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "transparent"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute top-0 left-0 right-0 bottom-0 rounded-lg"
          style={{ transform: [{ rotate: "-10deg" }] }} // Tilted overlay
        />
        
        {/* Text Content */}
        <Text className="text-white text-sm text-center opacity-80">
          Speculated Balance
        </Text>
        <Text className="text-white text-4xl font-bold text-center">
          $7,172.85
        </Text>
      </View>
    </View>
  );
}
