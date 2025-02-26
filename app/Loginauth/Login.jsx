import { View, Text } from "react-native";
import LoginComponent from "./logincard";


export default function LoginScreen() {
  return (
    <View className="flex-1 bg-[#0f1d14]  justify-center items-center">
      {/* Placeholder Logo (Circle) */}
      <View className="w-32 h-32 rounded-full bg-[#7BE495] justify-center items-center mb-5 mt-10">
        <Text className="text-[#0f1d14] font-bold text-lg">LOGO</Text>
      </View>

      {/* Heading */}
      <Text className="text-[#7BE495] text-2xl font-bold text-start">
        Go ahead and{"\n"}setup your account
      </Text>
      <Text className="text-gray-400 text-center mb-5">
        Sign up to enjoy maximum experience
      </Text>

      {/* Login Card */}
      <LoginComponent />
    </View>
  );
}
