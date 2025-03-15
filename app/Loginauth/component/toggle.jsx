import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const ToggleTab = ({ activeTab, setActiveTab }) => {
  return (
    <View className="mb-6 flex-row justify-between rounded-full bg-gray-300 p-3">
      <TouchableOpacity
        onPress={() => setActiveTab("login")}
        className={`flex-1 items-center rounded-full p-4 ${
          activeTab === "login" ? "bg-white" : ""
        }`}
      >
        <Text
          className={`font-semibold ${
            activeTab === "login" ? "text-black" : "text-gray-600"
          }`}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("register")}
        className={`flex-1 items-center rounded-full p-4 ${
          activeTab === "register" ? "bg-white" : ""
        }`}
      >
        <Text
          className={`font-semibold ${
            activeTab === "register" ? "text-black" : "text-gray-600"
          }`}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleTab;
