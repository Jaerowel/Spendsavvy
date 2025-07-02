import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

export default function BalanceCard() {
  return (
    <View className="relative flex items-center justify-center px-4">
      {/* Glow Effect (Using Box Shadow) */}
      <View className="absolute h-[180px] w-[24px] rounded-[11px] " />

      {/* Card with gradient background */}
      <LinearGradient
        colors={["#6FD080", "#57C56A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="relative h-[180px] w-[310px] overflow-hidden rounded-[11px] p-4"
      >
        {/* First Stripe */}
        <View className="absolute bottom-0 right-0 top-0">
          <Svg width={107} height={201} viewBox="0 0 107 201" fill="none">
            <Path
              d="M0.827087 201L89.9539 0H98.2334C102.519 0 107 7 107 9V122L76.804 201H0.827087Z"
              fill="white"
              fillOpacity="0.15"
            />
          </Svg>
        </View>

        {/* Second Stripe */}
        <View className="absolute bottom-0 right-10 top-0">
          <Svg width={155} height={201} viewBox="0 0 155 201" fill="none">
            <Path
              d="M154.96 0H90.1844H85.3141L0.0835876 200.5H73.1383L154.96 0Z"
              fill="white"
              fillOpacity="0.15"
            />
          </Svg>
        </View>

        {/* Balance Text */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-semibold text-white">
            Speculated Balance
          </Text>
          <Text className="text-6xl sm:text-base md:text-7xl lg:text-8xl  font-bold tracking-wide text-white">
            $7,172.85
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
