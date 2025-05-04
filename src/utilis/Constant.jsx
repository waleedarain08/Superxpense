// export const baseUrl = 'https://superxpnse-be.onrender.com/';
export const baseUrl = 'https://superxpnsebe.dev.cntxt.tools/';

export const API = {
  logIn: `${baseUrl}auth/login`,
  signUp: `${baseUrl}auth/signup`,
  tansActions: `${baseUrl}lean/transactions`,
  leanCustomer: `${baseUrl}lean/customer-access-token`,
  leanAccounts: `${baseUrl}lean/accounts`,
  leanConnection: `${baseUrl}lean/active-connections`,
  leanStats: `${baseUrl}lean/stats/category-expenses-by-month`,
  bankAccounts: `${baseUrl}lean/bank-listing-with-accounts`,
  barGraph: `${baseUrl}lean/stats/transactions-by-month`,
  incomeMonth: `${baseUrl}lean/stats/income-by-month`,
  addBudget: `${baseUrl}budget`,
  getAllCategories: `${baseUrl}category/all`,
  allBudgets: `${baseUrl}budget`,
  getUserData: `${baseUrl}auth/me`,
};
