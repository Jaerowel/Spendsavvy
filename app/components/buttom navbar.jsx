import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Dummy Screens
function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-lg">Home Screen</Text>
    </View>
  );
}

function TransactionsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-lg">Transactions Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-white text-lg">Profile Screen</Text>
    </View>
  );
}

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: "#121212", borderTopWidth: 0 },
          tabBarActiveTintColor: "#4ade80",
          tabBarInactiveTintColor: "#ffffff",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Transactions") iconName = "list";
            else if (route.name === "Profile") iconName = "person";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
