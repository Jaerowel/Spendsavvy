import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import Svg, { Circle, Text as SvgText, G, Rect } from "react-native-svg";

const PieChart = ({
  data = [],
  size = 200,
  strokeWidth = 30,
  gapDegrees = 2,
}) => {
  const chartRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(chartRotation, {
        toValue: 360,
        duration: 50000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = chartRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const totalPercentage = data.reduce((sum, seg) => sum + seg.percentage, 0);
  let cumulativeAngle = -90;

  const segments = data.map((seg) => {
    const angle = cumulativeAngle;
    const sweep = (seg.percentage / totalPercentage) * 360;
    const middleAngle = angle + sweep / 2;

    // Label distance
    const labelDistance = radius + strokeWidth + 25;
    const radians = (middleAngle * Math.PI) / 180;
    const labelX = size / 2 + labelDistance * Math.cos(radians);
    const labelY = size / 2 + labelDistance * Math.sin(radians);

    const gapAdjustedSweep = sweep - gapDegrees;
    cumulativeAngle += sweep;

    return {
      ...seg,
      angle,
      sweep: gapAdjustedSweep,
      labelX,
      labelY,
      middleAngle,
    };
  });

  return (
    <View className="relative items-center justify-center">
      {/* Rotating Chart */}
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={size} height={size}>
          <G>
            {segments.map((seg, index) => (
              <Circle
                key={`segment-${index}`}
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
                strokeLinecap="butt"
                rotation={seg.angle}
                originX={size / 2}
                originY={size / 2}
              />
            ))}
          </G>
        </Svg>
      </Animated.View>

      {/* Static Labels */}
      <Svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        width={size}
        height={size}
      >
        <G>
          {segments.map((seg, index) => (
            <G key={`label-${index}`}>
              <Rect
                x={seg.labelX - 25}
                y={seg.labelY - 15}
                width={50}
                height={30}
                fill="white"
                rx={15}
                ry={15}
                opacity={0.95}
              />
              <SvgText
                x={seg.labelX}
                y={seg.labelY + 2}
                fill={seg.color}
                fontSize={16}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {`${seg.percentage}%`}
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>

      {/* Center Text */}
      <View className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
        <Text className="text-4xl font-bold text-white text-center">
          ${totalPercentage}
        </Text>
        <Text className="text-sm text-gray-400 text-center">
          Total Spending
        </Text>
      </View>
    </View>
  );
};

export default PieChart;
