import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";
import ToggleTab from "./component/toggle";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login"); // State to track the active tab
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }
  
    try {
      console.log("Attempting login with", email, password);
  
      const response = await fetch("http://192.168.1.5:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      console.log("Raw response:", response);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        Alert.alert("Login Failed", `Server error: ${response.status}`);
        return;
      }
  
      const data = await response.json();
      console.log("Parsed response:", data);
  
      if (data.success) {
        Alert.alert("Success", "Login successful!");
        router.push("/screens/dashboard");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
  
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };
  

  return (
    <View className="w-full flex-grow rounded-3xl p-2">
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
      <LoginButton onPress={handleLogin} />
    </View>
  );
}
