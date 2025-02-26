import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Mail, Lock } from "lucide-react-native";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View className="bg-[#F9F2EF] p-6 rounded-t-3xl w-full flex-grow">
      {/* Toggle between Login & Register */}
      <View className="flex-row justify-between bg-gray-300 rounded-full p-1 mb-6">
        <TouchableOpacity className="flex-1 items-center bg-white rounded-full p-3">
          <Text className="font-semibold text-black">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center p-3">
          <Text className="font-semibold text-gray-600">Register</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <View className="bg-white p-4 rounded-lg mb-4 flex-row items-center shadow">
        <Mail size={20} color="#A3D86C" className="mr-2" />
        <View className="flex-1">
          <Text className="text-xs text-gray-500">Email Address</Text>
          <TextInput
            className="text-black text-sm font-semibold"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="bg-white p-4 rounded-lg mb-4 flex-row items-center shadow">
        <Lock size={20} color="#A3D86C" className="mr-2" />
        <View className="flex-1">
          <Text className="text-xs text-gray-500">Password</Text>
          <TextInput
            className="text-black text-sm font-semibold"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>



      {/* Login Button */}
      <TouchableOpacity
        className="bg-[#A3D86C] p-4 rounded-lg items-center"
        onPress={() => router.push("screens/dashboard")}
      >
        <Text className="text-white font-semibold text-lg">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
