import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DummyImage from "../components/helper/DummyImage";
import LoginComponent from "./logincard";
import RegisterComponent from "./Register";
import ToggleTab from "./component/toggle";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#0f1d14]"
      behavior={Platform.OS === "ios" ? "padding" : "height"} // padding for iOS, height for Android
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="mb-5 mt-10 items-center">
              <DummyImage name="logo2" style={{ width: 190, height: 190 }} />
            </View>

            {/* Text Section */}
            <View className="ml-7 items-start">
              <Text className="mb-4 text-4xl font-bold text-[#7BE495]">
                Go ahead and{"\n"}setup your account
              </Text>
              <Text className="mb-5 text-gray-400">
                {activeTab === "login"
                  ? "Sign in to enjoy maximum experience"
                  : "Sign up to get started"}
              </Text>
            </View>

            {/* Card Wrapper */}
            <View className="flex-grow rounded-2xl bg-white p-5">
              <ToggleTab activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Render Login or Register Component */}
              {activeTab === "login" ? (
                <LoginComponent />
              ) : (
                <RegisterComponent />
              )}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
