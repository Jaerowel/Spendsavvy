import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useProfile() {
  // State variables
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // API URL for profile requests - update to match your backend API
  const API_URL = 'http://192.168.1.5:3000/api'; // Adjust the IP/port to match your backend

  /**
   * Fetch user profile data from the API
   */
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get the authentication token
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      // Send request to the profile API endpoint
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data); // The response should be the user object
      } else {
        setError(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile data
   * @param {Object} profileData - The profile data to update
   * @returns {Promise<Object|null>} - The updated profile or null if update failed
   */
  const updateProfile = async (profileData) => {
    setUpdating(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        setError('No token found. Please log in again.');
        setUpdating(false);
        return null;
      }

      // You would need to create a PUT endpoint for updating profiles
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data); // Update the profile state with the updated data
        return data;
      } else {
        setError(data.message || 'Failed to update profile');
        return null;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Profile update error:', err);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Return the hook data and functions
  return {
    profile,
    loading,
    error,
    updating,
    fetchProfile,
    updateProfile,
  };
}