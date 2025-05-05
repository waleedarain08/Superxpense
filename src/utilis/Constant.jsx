// export const baseUrl = 'https://superxpnse-be.onrender.com/';
export const baseUrl = 'https://superxpnsebe.dev.cntxt.tools/';

export const API = {
  logIn: `${baseUrl}auth/login`,
  signUp: `${baseUrl}auth/signup`,
  tansActions: `${baseUrl}accounts/transactions`,
  leanCustomer: `${baseUrl}accounts/customer-access-token`,
  leanAccounts: `${baseUrl}accounts`,
  leanConnection: `${baseUrl}accounts/active-connections`,
  leanStats: `${baseUrl}stats/category-expenses-by-month`,
  bankAccounts: `${baseUrl}accounts/bank-listing-with-accounts`,
  barGraph: `${baseUrl}stats/transactions-by-month`,
  incomeMonth: `${baseUrl}stats/income-by-month`,
  addBudget: `${baseUrl}budget`,
  getAllCategories: `${baseUrl}category/all`,
  allBudgets: `${baseUrl}budget`,
  getUserData: `${baseUrl}auth/me`,
};
