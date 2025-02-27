import { View, Text } from "react-native";
import DummyImage from "../components/helper/DummyImage";
import LoginComponent from "./logincard";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-[#0f1d14] justify-center ">
      {/* Logo - Centered */}
      <View className="items-center mb-5 mt-10">
      
          <DummyImage name="logo2" style={{ width: 190, height: 190 }} /> 
        
      </View>

      {/* Text - Left-Aligned */}
      <View className="items-start ml-7">
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