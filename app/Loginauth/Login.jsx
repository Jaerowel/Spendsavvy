import { View, Text } from "react-native";
import LoginComponent from "./logincard";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-[#0f1d14] px-5 justify-center ">
      {/* Logo - Centered */}
      <View className="items-center mb-5 mt-10">
        <View className="w-32 h-32 rounded-full bg-[#7BE495] justify-center items-center">
          <Text className="text-[#0f1d14] font-bold text-lg">LOGO</Text>
        </View>
      </View>

      {/* Text - Left-Aligned */}
      <View className="items-start">
        <Text className="text-[#7BE495] text-4xl font-bold mb-4">
          Go ahead and{"\n"}setup your account
        </Text>
        <Text className="text-gray-400 mb-5">
          Sign up to enjoy maximum experience
        </Text>
      </View>

      {/* Login Card */}
      <LoginComponent />
    </View>
  );
}
