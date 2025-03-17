import { View } from "react-native";
import { useState } from "react";
import InputField from "./component/Inputfield";
import LoginButton from "./component/loginbuttons";

export default function RegisterTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    console.log("Registering:", email, password);
    const res = await fetch("http://192.168.1.5:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <View className="flex justify-center p-2  w-full">
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LoginButton title="Register" onPress={handleRegister} />
    </View>
  );
}
