import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const PieChart = ({
  data = [],
  size = 200,
  strokeWidth = 14,
  gapDegrees = 4, // gap between segments in degrees
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate total of percentages for scaling
  const totalPercentage = data.reduce((sum, seg) => sum + seg.percentage, 0);

  // Pre-calculate each segment's rotation and label position
  let cumulativeAngle = -90; // start from top (12 o'clock)

  const segments = data.map((seg) => {
    const angle = cumulativeAngle;
    const sweep = (seg.percentage / totalPercentage) * 360;

    const middleAngle = angle + sweep / 2;
    const labelDistance = radius + 30;

    // Calculate label X/Y
    const radians = (middleAngle * Math.PI) / 180;
    const labelX = (size / 2) + labelDistance * Math.cos(radians);
    const labelY = (size / 2) + labelDistance * Math.sin(radians);

    // Apply gap by reducing sweep angle
    const gapAdjustedSweep = sweep - gapDegrees;

    cumulativeAngle += sweep;

    return {
      ...seg,
      angle,
      sweep: gapAdjustedSweep,
      labelX,
      labelY,
    };
  });

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
        {segments.map((seg, index) => (
          <Circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={seg.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              ((100 - (seg.sweep * totalPercentage) / 360) / 100) *
              circumference
            }
            strokeLinecap="round"
            rotation={seg.angle}
            originX={size / 2}
            originY={size / 2}
          />
        ))}
      </Svg>

      {/* Center Text */}
      <View className="absolute items-center">
        <Text className="text-3xl font-bold text-white">
          {totalPercentage}%
        </Text>
        <Text className="text-sm text-gray-400">Transaction</Text>
      </View>

      {/* Percentage Labels */}
      {segments.map((seg, index) => (
        <View
          key={`label-${index}`}
          style={{
            position: "absolute",
            left: seg.labelX - 20, // adjust for label size
            top: seg.labelY - 10,
          }}
        >
          <Text className="rounded-lg bg-gray-700 px-2 py-1 text-white text-xs">
            {seg.percentage}%
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PieChart;
