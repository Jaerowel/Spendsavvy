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
          setIsReady(true); 
          SplashScreen.hideAsync(); 
          router.replace("./Loginauth/Login"); 
        }, 2000); 
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
          className="h-60 w-60"
          resizeMode="contain"
        />
      </View>
    );
  }


  return null;
}
