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
    if(!email || !password){
      Alert.alert("Error", "Please Fill in both email and password");
      return;
    }
    try{
      const response = await fetch("http://192.168.1.5:3000/login", {
        method: "POST",
        headers:{
          "Content-type": "application/json ",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        })
      });
      
      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Login successful!");
        router.push("screens/dashboard");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  return (
    <View className="bg-[#F9F2EF] p-6 rounded-3xl w-full flex-grow ">
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
      <LoginButton onPress={handleLogin} />
    </View>
  );
}
