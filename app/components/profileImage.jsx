import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

const ProfileImage = ({
  imageUrl,

  size = 128, // equivalent to h-32 w-32

  borderWidth = 4,
}) => {
  const editButtonSize = size * 0.25; // adjust size proportionally

  return (
    <View className="relative" style={{ width: size, height: size }}>
      {/* Profile Image */}
      <Image
        source={{ uri: imageUrl }}
        className="rounded-full"
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,

          borderWidth: borderWidth,
        }}
      />
    </View>
  );
};

export default ProfileImage;
