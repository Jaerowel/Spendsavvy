import { Alert, Platform } from "react-native";

// Use HTTPS and remove port from base URL
const API_BASE_URL = "https://0319-124-217-116-134.ngrok-free.app";

const fetchHandler = async (endpoint, method, data) => {
  try {
    // Include port in the endpoint
    const portEndpoint = `:1337${endpoint}`;
    const fullUrl = `${API_BASE_URL}${portEndpoint}`;
    
    console.log('[Request Details]', {
      url: fullUrl,
      method,
      data,
      platform: Platform.OS
    });

    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
      // Add timeout
      timeout: 15000,
    });

    console.log('[Response Details]', {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Error Response]:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('[Success Response]:', responseData);
    return { success: true, data: responseData };

  } catch (error) {
    console.error('[Network Error]:', {
      type: error.name,
      message: error.message,
      stack: error.stack
    });

    // Check for specific error types
    if (error.message.includes('Network request failed')) {
      return { 
        success: false, 
        error: 'Connection failed. Please check:\n- Internet connection\n- Server status\n- VPN settings' 
      };
    }

    return { success: false, error: error.message };
  }
};

// Register handler with correct endpoint
export const handleRegister = async (email, password) => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in both email and password");
    return { success: false };
  }

  // Updated endpoint path
  const result = await fetchHandler("/api/auth/register", "POST", { email, password });
  
  if (result.success) {
    Alert.alert("Success", "Registration successful!");
  } else {
    Alert.alert("Registration Failed", result.error || "Registration failed");
  }
  
  return result;
};

// Login handler with correct endpoint
export const handleLogin = async (email, password) => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in both email and password");
    return { success: false };
  }

  // Updated endpoint path - removed colon prefix
  const result = await fetchHandler("/api/auth/login", "POST", { email, password });
  
  if (result.success) {
    Alert.alert("Success", "Login successful!");
  } else {
    Alert.alert("Login Failed", result.error || "Invalid credentials");
  }

  return result;
};