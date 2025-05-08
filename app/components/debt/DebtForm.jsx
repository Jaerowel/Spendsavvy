import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

const DebtForm = ({ formData, handleChange, onSubmit, onCancel, buttonText }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="bg-[#1A2F1E] p-5 rounded-lg w-full">
        <Text className="text-white mb-1">Category</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Loan, Credit Card, Personal, etc."
          placeholderTextColor="#888"
          value={formData.category}
          onChangeText={(text) => handleChange("category", text)}
        />

        <Text className="text-white mb-1">Description</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Description of debt"
          placeholderTextColor="#888"
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
        />

        <Text className="text-white mb-1">Amount (PHP)</Text>
        <TextInput
          className="bg-[#333] text-white p-3 rounded-md mb-3"
          placeholder="Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange("amount", text)}
        />

        <View className="flex-row justify-center mt-4 space-x-3">
          <TouchableOpacity
            className="bg-gray-600 px-5 py-3 rounded-lg"
            onPress={onCancel}
          >
            <Text className="text-white font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-600 px-5 py-3 rounded-lg"
            onPress={onSubmit}
          >
            <Text className="text-white font-semibold">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DebtForm;