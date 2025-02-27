import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";


export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding immediately

        setTimeout(() => {
          setIsReady(true); // Set the app as ready
          SplashScreen.hideAsync(); // Hide splash screen
          router.replace("./Loginauth/Login"); // Redirect to the login page
        }, 2000); // Show splash screen for 2 seconds
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0E1D12]">
        <Image 
          source={require("../assets/logo.png")} 
          className="w-60 h-60" // ✅ Tailwind className now works!
          resizeMode="contain"
        />
      </View> 
    );
  }

  // After splash screen, you can return a placeholder or routing logic here
  return null;
}
