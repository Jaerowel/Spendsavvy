import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const ToggleTab = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex-row justify-between bg-gray-300 rounded-full p-3 mb-6">
      <TouchableOpacity
        onPress={() => setActiveTab("login")}
        className={`flex-1 items-center p-4 rounded-full ${
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
        className={`flex-1 items-center p-4 rounded-full ${
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
