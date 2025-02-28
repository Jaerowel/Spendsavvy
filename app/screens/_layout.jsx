import { Tabs } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Home, User, Cpu, HandCoins, Wallet } from "lucide-react-native";
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
            height: 72,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 5, // Fix elevation issues
            borderTopWidth: 0,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarActiveTintColor: "#7BE495",
          tabBarInactiveTintColor: "#bbb",
          tabBarShowLabel: true,
          headerShown: false,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ), // Apply globally
        }}
      >
        {/* Dashboard Tab */}
        <Tabs.Screen
          name="dashboard"
          options={{
            tabBarIcon: ({ color }) => <Home size={25} color={color} />,
          }}
        />

        {/* Tracking Tab */}
        <Tabs.Screen
          name="Tracking"
          options={{
            tabBarIcon: ({ color }) => <Wallet size={25} color={color} />,
          }}
        />

        {/* Chatbot Floating Button */}
        <Tabs.Screen
          name="chatbot"
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1} // Prevent ripple effect
                style={{
                  top: -30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#7BE495",
                  width: 64,
                  height: 64,
                  left: "10%",
                  borderRadius: 32,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 10, // Ensure it stays above everything
                  zIndex: 100, // Highest zIndex to prevent touch issues
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
            tabBarIcon: ({ color }) => <HandCoins size={25} color={color} />,
          }}
        />

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => <User size={25} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
