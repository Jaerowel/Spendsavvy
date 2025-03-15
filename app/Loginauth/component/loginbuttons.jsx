import React from "react";
import { TouchableOpacity, Text } from "react-native";

const LoginButton = ({ onPress, label = "Login" }) => {
  return (
    <TouchableOpacity
      className="mt-5 items-center rounded-2xl bg-[#A3D86C] p-3"
      onPress={onPress}
    >
      <Text className="p-2 text-lg font-semibold text-white">{label}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;
