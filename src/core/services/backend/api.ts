import {getUrlPath, makeRequest} from './Caller';
import {endpoints, FetchMethods} from '../../constants/main';

// we can break this down into smaller files
export const api = {
  user: {
    profile: async (id: string) => {
      const url = getUrlPath(`${endpoints.user.profile}/${id}`);
      return await makeRequest(url, FetchMethods.GET);
    },
  },
  expenses: {
    getAll: async (id: string) => {
      const url = getUrlPath(
        `${endpoints.user.profile}/${id}${endpoints.expenses.all}`,
      );
      return await makeRequest(url, FetchMethods.GET);
    },
    addBalance: async (
      id: string,
      totalExpensesAmount: number,
      remainingBalance: number,
    ) => {
      const url = getUrlPath(`${endpoints.user.profile}/${id}`);
      return await makeRequest(url, FetchMethods.PUT, {
        totalExpensesAmount: totalExpensesAmount,
        remainingBalance: remainingBalance,
      });
    },
    addTransactio: async (id: string, transactions: any[]) => {
      const url = getUrlPath(
        `${endpoints.user.profile}/${id}${endpoints.expenses.all}`,
      );
      return await makeRequest(url, FetchMethods.POST, transactions);
    },
  },
  income: {
    addBalance: async (
      id: string,
      balance: number,
      remainingBalance: number,
    ) => {
      const url = getUrlPath(`${endpoints.user.profile}/${id}`);
      return await makeRequest(url, FetchMethods.PUT, {
        totalIncome: balance,
        remainingBalance: remainingBalance,
      });
    },
    addTransactio: async (id: string, transactions: any[]) => {
      const url = getUrlPath(`${endpoints.user.profile}/${id}`);
      return await makeRequest(url, FetchMethods.PUT, {
        transactions: transactions,
      });
    },
  },
};
