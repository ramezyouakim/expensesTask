import ExpensesIncome from './expenses/expenses';
import User from './user/User';

const user = new User();
export const expensesIncomeService = new ExpensesIncome(
  user.id,
  user.transactions,
  user.totalExpensesAmount,
  user.totalIncome,
  user.remainingBalance,
);
