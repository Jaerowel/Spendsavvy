import { Tabs } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Home, Wallet, User, Cpu, HandCoins } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 bg-[#1d1f24]">
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1d1f24",
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            height: 72, // Increased height for floating button
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
            alignItems: "center", // Center the icons
            justifyContent: "center",
          },
          tabBarActiveTintColor: "#7BE495",
          tabBarInactiveTintColor: "#bbb", // Lightened inactive icon color
          tabBarShowLabel: true,
          headerShown: false, // Remove header globally
        }}
      >
        {/* Dashboard Tab */}
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ color }) => (
              <Home size={25} color={color} className="self-center" />
            ),
          }}
        />

        {/* Wallet Tab */}
        <Tabs.Screen
          name="tracking"
          options={{
            tabBarIcon: ({ color }) => (
              <Wallet size={25} color={color} className="self-center" />
            ),
          }}
        />

        {/* Tracking Tab with Floating Button */}
        <Tabs.Screen
          name="chatbot"
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                style={{
                  top: -30, // Adjusted position
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#7BE495",
                  width: 64,
                  left:10,
                  height: 64,
                  borderRadius: 32,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                }}
              >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Cpu size={25} color="#1d1f24" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        {/* Debt Tab */}
        <Tabs.Screen
          name="debt"
          options={{
            tabBarIcon: ({ color }) => (
              <HandCoins size={25} color={color} className="self-center" />
            ),
          }}
        />

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <User size={25} color={color} className="self-center" />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
