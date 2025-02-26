import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

export default function BalanceCard() {
  return (
    <View className="relative flex items-center justify-center px-4">
      {/* Glow Effect (Using Box Shadow) */}
      <View className="absolute w-[324px] h-[180px] rounded-[11px] shadow-[0px_0px_20px_5px_rgba(75,200,113,1.00)]" />

      {/* Card with gradient background */}
      <LinearGradient
        colors={["#6FD080", "#57C56A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-[310px] h-[180px] rounded-[11px] p-4 overflow-hidden relative"
      >
        {/* First Stripe */}
        <View className="absolute right-0 top-0 bottom-0">
          <Svg width={107} height={201} viewBox="0 0 107 201" fill="none">
            <Path
              d="M0.827087 201L89.9539 0H98.2334C102.519 0 107 7 107 9V122L76.804 201H0.827087Z"
              fill="white"
              fillOpacity="0.15"
            />
          </Svg>
        </View>

        {/* Second Stripe */}
        <View className="absolute right-10 top-0 bottom-0">
          <Svg width={155} height={201} viewBox="0 0 155 201" fill="none">
            <Path
              d="M154.96 0H90.1844H85.3141L0.0835876 200.5H73.1383L154.96 0Z"
              fill="white"
              fillOpacity="0.15"
            />
          </Svg>
        </View>

        {/* Balance Text */}
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg font-semibold">Speculated Balance</Text>
          <Text className="text-white text-7xl font-bold tracking-wide">$7,172.85</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
