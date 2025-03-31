import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Get token from storage
        const response = await fetch("http://192.168.1.5:3000/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTransactions(data.transactions); // Set transactions in state
        } else {
          setError(data.message || "Failed to fetch transactions");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Fetch Transactions Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
}