import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const ProfileButton = ({
  label = "",
  onPress,
  borderColor = "transparent",
  icon = null, // Now expecting JSX, not a component reference
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-[#363636] px-4 py-4 rounded-xl mb-4 border border-green-500 h-[25%]"
      style={{ borderColor: borderColor, borderWidth: 1 }}
    >
      {/* Icon in a circular container */}
      <View className="h-10 w-10 mr-4 rounded-full bg-[#404040] justify-center items-center">
        {icon}
      </View>

      {/* Label */}
      <Text className="text-green-500 font-semibold text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;
