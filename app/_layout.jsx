import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // Import StatusBar
import "../global.css";

export default function RootLayout() {
  return (
    <>
      {/* Global StatusBar */}

      <StatusBar className="bg-[#1d1f24]" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
