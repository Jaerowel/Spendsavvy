import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";

export default function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    // Validation checks
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.5:3000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", "Registration successful!");
        // After registering, navigate to login or dashboard
        router.push("screens/dashboard"); // Or go back to login screen
      } else {
        Alert.alert("Registration Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  return (
    <View className="p-2 rounded-3xl w-full flex-grow">
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

      {/* Confirm Password Input */}
      <InputField
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Register Button */}
      <LoginButton onPress={handleRegister} label="Register" />
    </View>
  );
}
