import React, { useState } from "react";
import { View, Text } from "react-native";
import DummyImage from "../components/helper/DummyImage";
import LoginComponent from "./logincard"; // Login form
import RegisterComponent from "./Register"; // Register form
import ToggleTab from "./component/toggle";// The toggle tab you made

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");

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
          {activeTab === "login"
            ? "Sign in to enjoy maximum experience"
            : "Sign up to get started"}
        </Text>
      </View>

      {/* Card Wrapper */}
      <View className=" p-5 rounded-2xl bg-white flex-grow">
        {/* Toggle tab inside the card */}
        <ToggleTab activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Conditional rendering based on activeTab */}
        {activeTab === "login" ? <LoginComponent /> : <RegisterComponent />}
      </View>
    </View>
  );
}
