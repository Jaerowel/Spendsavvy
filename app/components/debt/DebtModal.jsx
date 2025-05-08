import React from "react";
import { View, Text, Modal } from "react-native";
import DebtForm from "./DebtForm";

const DebtModal = ({
  visible,
  onRequestClose,
  title,
  formData,
  handleChange,
  onSubmit,
  buttonText,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View className="flex-1 justify-center items-center p-5 bg-black/70">
        <View className="w-full">
          <Text className="text-white text-xl font-bold mb-4 text-center">
            {title}
          </Text>
          <DebtForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={onSubmit}
            onCancel={onRequestClose}
            buttonText={buttonText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DebtModal;