import React from "react";
import { TouchableOpacity, Text } from "react-native";

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="bg-[#A3D86C] p-3 rounded-2xl items-center mt-5"
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-lg p-2">Login</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
