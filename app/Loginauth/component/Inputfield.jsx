import React from "react";
import { TextInput, Text, View } from "react-native";
import { Mail, Lock } from "lucide-react-native";

const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  const isEmail = label === "Email Address";

  return (
    <View className="bg-white p-2 rounded-2xl mb-4 flex-row items-center shadow">
      {isEmail ? (
        <Mail size={20} color="#A3D86C" className="mr-5" />
      ) : (
        <Lock size={20} color="#A3D86C" className="mr-2" />
      )}
      <View className="flex-1">
        <Text className="text-xs text-gray-500 ml-3">{label}</Text>
        <TextInput
          className="text-black text-sm font-bold ml-2"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={isEmail ? "email-address" : "default"}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default InputField;
