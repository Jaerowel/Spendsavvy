import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const PieChart = ({ data = [], size = 200, strokeWidth = 14 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View className="relative items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2E2E2E"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Segmented Circles */}
        {data.length > 0 &&
          data.map((seg, index) => (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={(1 - seg.percentage / 100) * circumference}
              strokeLinecap="round"
              transform={[{ rotate: `${seg.angle}deg` }]}
              originX={size / 2}
              originY={size / 2}
            />
          ))}
      </Svg>

      {/* Center Text */}
      <View className="absolute items-center">
        <Text className="text-3xl font-bold text-white">
          {data.reduce((sum, seg) => sum + seg.percentage, 0)}%
        </Text>
        <Text className="text-sm text-gray-400">Transaction</Text>
      </View>

      {/* Percentage Labels */}
      {data.map((seg, index) => (
        <View
          key={`label-${index}`}
          style={{ position: "absolute", ...seg.position }}
        >
          <Text className="rounded-lg bg-gray-700 px-2 py-1 text-white">
            {seg.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PieChart;
