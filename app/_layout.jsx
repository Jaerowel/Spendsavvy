import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      {/* Global StatusBar */}
      <StatusBar style="light" />
      
      {/* Main navigation Stack */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0E1D12" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Loginauth" />
        <Stack.Screen
          name="(tabs)"
          options={{ 
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
    </>
  );
}
