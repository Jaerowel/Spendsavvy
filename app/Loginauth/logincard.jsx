import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import ToggleTab from "./component/toggle";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login"); // State to track the active tab
  const router = useRouter();

  return (
    <View className="bg-[#F9F2EF] p-6 rounded-t-3xl w-full flex-grow">
      {/* Toggle between Login & Register */}
      <ToggleTab activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Email Input */}
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <LoginButton onPress={() => router.push("screens/dashboard")} />
    </View>
  );
}
