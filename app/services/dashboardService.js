import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'https://your-mongodb-api.com/api'; // Replace with your actual API URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetch all dashboard data including balance, income, expenses, and recent transactions
 * @returns {Promise<Object>} Dashboard data
 */
export const fetchDashboardData = async () => {
  try {
    // Get date range for current month
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Format dates for API
    const startDate = firstDayOfMonth.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    // Make API request to dashboard endpoint
    const response = await api.get('/dashboard', {
      params: {
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with an error
      if (error.response.status === 401) {
        // Handle authentication error
        await AsyncStorage.removeItem('userToken');
        throw new Error('Your session has expired. Please log in again.');
      } else {
        throw new Error(error.response.data.message || 'Failed to load dashboard data');
      }
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Error setting up the request
      throw new Error('An unexpected error occurred');
    }
  }
};

/**
 * Fetch transactions with optional filtering
 * @param {Object} filters - Filters for transactions
 * @param {string} filters.startDate - Start date (YYYY-MM-DD)
 * @param {string} filters.endDate - End date (YYYY-MM-DD)
 * @param {string} filters.type - Transaction type ('income' or 'expense')
 * @param {string} filters.category - Transaction category
 * @param {number} filters.limit - Maximum number of transactions to return
 * @returns {Promise<Array>} Transactions
 */
export const fetchTransactions = async (filters = {}) => {
  try {
    const response = await api.get('/transactions', {
      params: filters,
    });
    
    return response.data.transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to load transactions');
  }
};

/**
 * Update the wallet balance
 * @param {number} newBalance - New wallet balance
 * @returns {Promise<Object>} Updated wallet data
 */
export const updateWalletBalance = async (newBalance) => {
  try {
    const response = await api.put('/wallet', {
      balance: newBalance,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating wallet balance:', error);
    throw new Error('Failed to update balance');
  }
};

/**
 * Get spending summary by category for a date range
 * @param {Object} params - Parameters for spending summary
 * @param {string} params.startDate - Start date (YYYY-MM-DD)
 * @param {string} params.endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Object>} Spending summary by category
 */
export const getSpendingSummary = async (params = {}) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Default to current month if not specified
    const startDate = params.startDate || firstDayOfMonth.toISOString().split('T')[0];
    const endDate = params.endDate || today.toISOString().split('T')[0];
    
    const response = await api.get('/transactions/summary', {
      params: {
        startDate,
        endDate,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting spending summary:', error);
    throw new Error('Failed to load spending summary');
  }
};

/**
 * Get financial insights including savings rate and recommendations
 * @returns {Promise<Object>} Financial insights
 */
export const getFinancialInsights = async () => {
  try {
    const response = await api.get('/insights');
    return response.data;
  } catch (error) {
    console.error('Error getting financial insights:', error);
    throw new Error('Failed to load financial insights');
  }
};

/**
 * Get monthly comparison data for spending trends
 * @param {number} monthsToCompare - Number of months to compare (default: 3)
 * @returns {Promise<Array>} Monthly comparison data
 */
export const getMonthlyComparison = async (monthsToCompare = 3) => {
  try {
    const response = await api.get('/transactions/monthly-comparison', {
      params: { months: monthsToCompare },
    });
    
    return response.data.monthlyData;
  } catch (error) {
    console.error('Error getting monthly comparison:', error);
    throw new Error('Failed to load monthly comparison data');
  }
};

/**
 * Get budget status for current month
 * @returns {Promise<Object>} Budget status
 */
export const getBudgetStatus = async () => {
  try {
    const response = await api.get('/budget/status');
    return response.data;
  } catch (error) {
    console.error('Error getting budget status:', error);
    throw new Error('Failed to load budget status');
  }
};

/**
 * Add a new transaction
 * @param {Object} transaction - Transaction data
 * @returns {Promise<Object>} Created transaction
 */
export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions', transaction);
    return response.data.transaction;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

/**
 * Generic error handler for dashboard services
 * @param {Error} error - The error object
 * @returns {string} Error message for display
 */
export const handleServiceError = (error) => {
  if (error.message.includes('session has expired')) {
    return 'Your session has expired. Please log in again.';
  } else if (error.message.includes('Network error')) {
    return 'Network error. Please check your connection and try again.';
  } else {
    return error.message || 'An unexpected error occurred. Please try again.';
  }
};

// For development/testing - add this at the end of the file
export const fetchDashboardDataMock = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    balance: 1250.75,
    income: 2000.00, 
    expenses: 749.25,
    savingsRate: 15,
    recentTransactions: [
      {
        id: "t1",
        description: "Grocery shopping",
        amount: 85.50,
        type: "expense",
        category: "Food",
        date: "2025-05-05T12:00:00.000Z"
      },
      {
        id: "t2", 
        description: "Salary",
        amount: 2000.00,
        type: "income",
        category: "Salary",
        date: "2025-05-01T09:00:00.000Z"
      }
    ]
  };
};

// For testing, uncomment this line to use mock data instead of API calls
// export const fetchDashboardData = fetchDashboardDataMock;