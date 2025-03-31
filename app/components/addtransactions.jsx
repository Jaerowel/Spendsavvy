import AsyncStorage from "@react-native-async-storage/async-storage";

const addTransaction = async (transactionData) => {
  try {
    const token = await AsyncStorage.getItem("token"); // Get the token from storage
    const response = await fetch("http://192.168.1.5:3000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Transaction added successfully:", data.transaction);
      return data.transaction; // Return the newly created transaction
    } else {
      console.error("Error adding transaction:", data.message);
      return null;
    }
  } catch (err) {
    console.error("Network error:", err);
    return null;
  }
};