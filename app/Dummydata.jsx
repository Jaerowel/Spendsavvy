// Mock data to simulate backend responses for SpendSavvy app

export const MOCK_DASHBOARD_DATA = {
  balance: 2450.75,
  income: 3000.00,
  expenses: 549.25,
  savingsRate: 12,
  recentTransactions: [
    {
      id: "t1",
      description: "Grocery Shopping",
      amount: 85.50,
      type: "expense",
      category: "Food",
      date: new Date(2025, 5, 10).toISOString()
    },
    {
      id: "t2",
      description: "Salary Deposit",
      amount: 3000.00,
      type: "income",
      category: "Salary",
      date: new Date(2025, 5, 1).toISOString()
    },
    {
      id: "t3",
      description: "Netflix Subscription",
      amount: 14.99,
      type: "expense",
      category: "Entertainment",
      date: new Date(2025, 5, 8).toISOString()
    },
    {
      id: "t4",
      description: "Gas Station",
      amount: 45.75,
      type: "expense",
      category: "Transport",
      date: new Date(2025, 5, 7).toISOString()
    },
    {
      id: "t5",
      description: "Restaurant Dinner",
      amount: 78.50,
      type: "expense",
      category: "Food",
      date: new Date(2025, 5, 6).toISOString()
    }
  ]
};

export const MOCK_TRACKING_DATA = {
  totalExpense: 549.25,
  totalIncome: 3000.00,
  categories: {
    "Food": 164.00,
    "Transport": 45.75,
    "Entertainment": 14.99,
    "Housing": 225.00,
    "Utilities": 99.51
  },
  monthlySummary: {
    "Jan": 520.45,
    "Feb": 485.30,
    "Mar": 510.20,
    "Apr": 490.75,
    "May": 530.10,
    "Jun": 549.25
  }
};

export const MOCK_BUDGET_DATA = {
  totalBudget: 1200.00,
  spent: 549.25,
  remaining: 650.75,
  categories: [
    {
      category: "Food",
      budget: 300.00,
      spent: 164.00,
      percentage: 54.7
    },
    {
      category: "Transport",
      budget: 150.00,
      spent: 45.75,
      percentage: 30.5
    },
    {
      category: "Entertainment",
      budget: 100.00,
      spent: 14.99,
      percentage: 15.0
    },
    {
      category: "Housing",
      budget: 450.00,
      spent: 225.00,
      percentage: 50.0
    },
    {
      category: "Utilities",
      budget: 200.00,
      spent: 99.51,
      percentage: 49.8
    }
  ]
};

export const MOCK_USER_DATA = {
  id: "user123",
  name: "Alex Johnson",
  email: "alex@example.com",
  profilePicture: null,
  currency: "USD",
  joinDate: "2024-12-01"
};

// Helper function to generate summary text based on financial data
export const generateFinancialSummary = (data) => {
  if (!data) return "Add transactions to see your financial summary.";
  
  const { savingsRate, expenses } = data;
  
  if (savingsRate > 0) {
    return `Your spending is on track this month. You've saved ${savingsRate}% more compared to last month.`;
  } else if (savingsRate < 0) {
    return `Your spending has increased by ${Math.abs(savingsRate)}% compared to last month. Consider reviewing your budget.`;
  } else if (expenses === 0) {
    return "No expenses recorded this month. Start tracking your spending to get insights.";
  } else {
    return "Your spending is stable compared to last month.";
  }
};

// Helper function to generate category insights based on spending data
export const generateCategoryInsights = (categories) => {
  if (!categories || Object.keys(categories).length === 0) {
    return "Add transactions to see category insights.";
  }
  
  // Find the category with the highest spending
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1]);
  
  const [topCategory, topAmount] = sortedCategories[0];
  const totalSpent = Object.values(categories).reduce((sum, val) => sum + val, 0);
  const percentage = Math.round((topAmount / totalSpent) * 100);
  
  if (percentage > 50) {
    return `Your highest spending category is ${topCategory} (${percentage}%). Consider setting a budget limit for this category.`;
  } else if (percentage > 30) {
    return `Your highest spending category is ${topCategory} (${percentage}%).`;
  } else {
    return `Your spending is well distributed across categories, with ${topCategory} being the highest at ${percentage}%.`;
  }
};