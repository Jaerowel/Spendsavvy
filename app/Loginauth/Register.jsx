import { View } from "react-native";
import { useState } from "react";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";
import { handleRegister } from "./component/Handler";

export default function RegisterTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onRegister = async () => {
    const result = await handleRegister(email, password, username);
    if (result.success) {
      // Handle successful registration
      console.log("Registration successful");
    } else {
      // Handle registration error
      console.error("Registration failed:", result.error);
    }
  };

  return (
    <View className="flex justify-center p-2 w-full">
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoginButton label="Register" onPress={onRegister} />
    </View>
  );
}