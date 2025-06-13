import { Tabs } from "expo-router";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { Home, User, Cpu, HandCoins, Wallet } from "lucide-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  
 
  const getTabBarStyle = () => {
  
    const baseStyle = {
      backgroundColor: "#1d1f24",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 5,
      borderTopWidth: 0,
      alignItems: "center",
      justifyContent: "center",
    };
    
    // Mobile
    if (width < 640) {
      return {
        ...baseStyle,
        height: 72,
      };
    }
    
    // Tablet (sm, md)
    if (width >= 640 && width < 1024) {
      return {
        ...baseStyle,
        height: 80,
        paddingBottom: 8,
      };
    }
    
    // Desktop (lg, xl)
    return {
      ...baseStyle,
      height: 88,
      paddingBottom: 12,
    };
  };
  
  // Get floating button position for different screen sizes
  const getFloatingButtonStyle = () => {
    const baseStyle = {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#7BE495",
      width: width >= 768 ? 72 : 64,
      height: width >= 768 ? 72 : 64,
      borderRadius: width >= 768 ? 36 : 32,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 10,
      zIndex: 100,
    };
    
    // Adjust left position for different screen sizes
    if (width < 640) {
      return { ...baseStyle, top: -30, left: "10%" };
    } else if (width < 1024) {
      return { ...baseStyle, top: -36, left: "5%" };
    } else {
      return { ...baseStyle, top: -40, left: "2%" };
    }
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#0E1D12]" edges={['top']}>
        {/* Header */}
        <Header />
        
        {/* Tab Navigation */}
        <Tabs
          screenOptions={{
            tabBarStyle: getTabBarStyle(),
            tabBarActiveTintColor: "#7BE495",
            tabBarInactiveTintColor: "#bbb",
            tabBarShowLabel: true,
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: width >= 768 ? 14 : 12,
              marginBottom: width >= 1024 ? 8 : 4,
            },
            tabBarIconStyle: {
              marginTop: width >= 768 ? 6 : 4,
            },
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={1} />
            ),
          }}
        >
          {/* Dashboard Tab */}
          <Tabs.Screen
            name="dashboard"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <Home size={width >= 768 ? 28 : 25} color={color} />,
            }}
          />

          {/* Tracking Tab */}
          <Tabs.Screen
            name="tracking"
            options={{
              title: "Tracking",
              tabBarIcon: ({ color }) => <Wallet size={width >= 768 ? 28 : 25} color={color} />,
            }}
          />

          {/* Chatbot Floating Button */}
          <Tabs.Screen
            name="chatbot"
            options={{
              title: "AI Assistant",
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...props}
                  activeOpacity={1}
                  style={getFloatingButtonStyle()}
                >
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Cpu size={width >= 768 ? 28 : 25} color="#1d1f24" />
                  </View>
                </TouchableOpacity>
              ),
            }}
          />

          {/* Debt Tab */}
          <Tabs.Screen
            name="debt"
            options={{
              title: "Debt",
              tabBarIcon: ({ color }) => <HandCoins size={width >= 768 ? 28 : 25} color={color} />,
            }}
          />

          {/* Profile Tab */}
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => <User size={width >= 768 ? 28 : 25} color={color} />,
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}