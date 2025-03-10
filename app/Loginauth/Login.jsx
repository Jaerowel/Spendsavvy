import { View, Text } from "react-native";
import DummyImage from "../components/helper/DummyImage";
import LoginComponent from "./logincard";

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center bg-[#0f1d14]">
      {/* Logo - Centered */}
      <View className="mb-5 mt-10 items-center">
        <DummyImage name="logo2" style={{ width: 190, height: 190 }} />
      </View>

      {/* Text - Left-Aligned */}
      <View className="ml-7 items-start">
        <Text className="mb-4 text-4xl font-bold text-[#7BE495]">
          Go ahead and{"\n"}setup your account
        </Text>
        <Text className="mb-5 text-gray-400">
          Sign up to enjoy maximum experience
        </Text> 
      </View>

      {/* Login Card */}
      <LoginComponent />
    </View>
  );
}
