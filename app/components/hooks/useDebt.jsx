import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debts as dummyDebts } from '../helper/DummyData'; // Import dummy data for fallback

export default function useDebt() {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API URL - replace with your backend URL when ready
  const API_URL = 'http://192.168.1.5:3000/api/debts';
  
  // Helper function to get auth headers
  const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // READ - Get all debts
  const fetchDebts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Attempt to fetch from API
      const headers = await getAuthHeaders();
      const response = await fetch(API_URL, {
        method: 'GET',
        headers
      });
      
      // Check if it's a successful response
      if (response.ok) {
        const data = await response.json();
        setDebts(data.debts);
        return data.debts;
      } else {
        // For demo/development, use dummy data if API fails
        console.log('Using dummy data since API fetch failed');
        setDebts(dummyDebts);
        return dummyDebts;
      }
    } catch (err) {
      console.error('Fetch debts error:', err);
      // Fallback to dummy data for demonstration
      setDebts(dummyDebts);
      return dummyDebts;
    } finally {
      setLoading(false);
    }
  };
  
  // CREATE - Add a new debt
  const addDebt = async (debtData) => {
    try {
      // Add an ID for the new debt (backend would typically do this)
      const newDebt = {
        ...debtData,
        id: `temp-${Date.now()}`, // Temporary ID until backend assigns one
        date: debtData.date || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
      };
      
      // Try to send to API
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(API_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(debtData)
        });
        
        if (response.ok) {
          const data = await response.json();
          // Update with the data from the server (which should have a proper ID)
          setDebts(prevDebts => [...prevDebts, data.debt]);
          return data.debt;
        }
      } catch (apiError) {
        console.error('API error when adding debt:', apiError);
      }
      
      // Fallback: Just update local state without API
      setDebts(prevDebts => [...prevDebts, newDebt]);
      return newDebt;
    } catch (err) {
      setError('Error adding debt: ' + err.message);
      console.error('Add debt error:', err);
      return null;
    }
  };
  
  // UPDATE - Update an existing debt
  const updateDebt = async (debtId, updates) => {
    try {
      // Try API update
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/${debtId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(updates)
        });
        
        if (response.ok) {
          const data = await response.json();
          setDebts(prevDebts => 
            prevDebts.map(debt => 
              debt.id === debtId ? { ...debt, ...updates } : debt
            )
          );
          return data.debt;
        }
      } catch (apiError) {
        console.error('API error when updating debt:', apiError);
      }
      
      // Fallback: Update locally
      setDebts(prevDebts => 
        prevDebts.map(debt => 
          debt.id === debtId ? { ...debt, ...updates } : debt
        )
      );
      
      return { id: debtId, ...updates };
    } catch (err) {
      setError('Error updating debt: ' + err.message);
      console.error('Update debt error:', err);
      return null;
    }
  };
  
  // DELETE - Remove a debt
  const deleteDebt = async (debtId) => {
    try {
      // Try API delete
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/${debtId}`, {
          method: 'DELETE',
          headers
        });
        
        if (response.ok) {
          // If API delete succeeds, remove from local state
          setDebts(prevDebts => prevDebts.filter(debt => debt.id !== debtId));
          return true;
        }
      } catch (apiError) {
        console.error('API error when deleting debt:', apiError);
      }
      
      // Fallback: Just remove locally
      setDebts(prevDebts => prevDebts.filter(debt => debt.id !== debtId));
      return true;
      
    } catch (err) {
      setError('Error deleting debt: ' + err.message);
      console.error('Delete debt error:', err);
      return false;
    }
  };
  
  // Fetch debts when the component mounts
  useEffect(() => {
    fetchDebts();
  }, []);
  
  return {
    debts,
    loading,
    error,
    fetchDebts,   // READ
    addDebt,      // CREATE
    updateDebt,   // UPDATE
    deleteDebt    // DELETE
  };
}