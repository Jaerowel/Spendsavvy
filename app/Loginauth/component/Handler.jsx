import { Alert, Platform } from "react-native";

const API_BASE_URL = "http://192.168.1.5:3000";

const logRequestDetails = (url, method, data) => {
  console.log('[Request Details]', {
    url,
    method,
    data,
    platform: Platform.OS
  });
};

const logResponseDetails = (response) => {
  console.log('[Response Details]', {
    status: response.status,
    ok: response.ok,
    statusText: response.statusText
  });
};

const logErrorDetails = (error) => {
  console.error('[Network Error]:', {
    type: error.name,
    message: error.message,
    stack: error.stack
  });
};

const fetchHandler = async (endpoint, method, data) => {
  try {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    logRequestDetails(fullUrl, method, data);

    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    logResponseDetails(response);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Error Response]:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('[Success Response]:', responseData);
    return { success: true, data: responseData };

  } catch (error) {
    logErrorDetails(error);

    if (error.message.includes('Network request failed')) {
      return { 
        success: false, 
        error: 'Connection failed. Please check:\n- Internet connection\n- Server status\n- VPN settings' 
      };
    }

    return { success: false, error: error.message };
  }
};

const validateInputs = (email, password) => {
  if (!email || !password) {
    Alert.alert("Error", "Please fill in both email and password");
    return false;
  }
  return true;
};

export const handleRegister = async (email, password) => {
  if (!validateInputs(email, password)) {
    return { success: false };
  }

  const result = await fetchHandler("/api/auth/register", "POST", { email, password });
  
  if (result.success) {
    Alert.alert("Success", "Registration successful!");
  } else {
    Alert.alert("Registration Failed", result.error || "Registration failed");
  }
  
  return result;
};

export const handleLogin = async (email, password) => {
  if (!validateInputs(email, password)) {
    return { success: false };
  }

  const result = await fetchHandler("/api/auth/login", "POST", { email, password });
  
  if (result.success) {
    Alert.alert("Success", "Login successful!");
  } else {
    Alert.alert("Login Failed", result.error || "Invalid credentials");
  }

  return result;
};