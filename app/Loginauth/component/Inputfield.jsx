import React from "react";
import { TextInput, Text, View } from "react-native";
import { Mail, Lock } from "lucide-react-native";

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const isEmail = label === "Email Address";

  return (
    <View className="mb-4 flex-row items-center rounded-2xl bg-white p-2 shadow">
      {isEmail ? (
        <Mail size={20} color="#A3D86C" className="mr-5" />
      ) : (
        <Lock size={20} color="#A3D86C" className="mr-2" />
      )}
      <View className="flex-1">
        <Text className="ml-3 text-xs text-gray-500">{label}</Text>
        <TextInput
          className="ml-2 text-sm font-bold text-black"
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
