import { MOCK_DASHBOARD_DATA } from '../Dummydata';

// Simulates API delay
const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock fetch transactions function to replace real API calls
export const fetchTransactions = async (filters = {}) => {
  console.log('Using mock transactions instead of API call');
  await simulateDelay();
  
  let transactions = [...MOCK_DASHBOARD_DATA.recentTransactions];
  
  // Apply filters if provided
  if (filters.type) {
    transactions = transactions.filter(t => t.type === filters.type);
  }
  
  return transactions;
};