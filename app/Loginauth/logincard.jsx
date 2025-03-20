import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import ToggleTab from "./component/toggle";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";
import { handleLogin } from "./component/Handler";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const onLogin = async () => {
    const result = await handleLogin(email, password);
    if (result.success) {
      router.push("/screens/dashboard");
    }
  };

  return (
    <View className="w-full flex-grow rounded-3xl p-2">
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <LoginButton onPress={onLogin} />
    </View>
  );
}