import {action, computed, makeObservable, observable} from 'mobx';
import {api} from '../backend/api';
import {groupByCategory} from '../../utils/helper';
import Navigator from '../../../routes/Navigator';

class ExpensesIncome {
  private static instance: ExpensesIncome;

  @observable loading: boolean = false;
  @observable totalExpensesItems: any[] = [];
  userId: string;
  @observable transactions: any[] = [];
  @observable totalExpensesAmount: number = 0;
  @observable totalIncome: number = 0;
  @observable remainingBalance: number = 0;

  constructor(
    userId: string,
    transactions: any[] = [],
    totalExpensesAmount: number = 0,
    totalIncome: number = 0,
    remainingBalance: number = 0,
  ) {
    makeObservable(this);
    this.userId = userId;
    this.transactions = transactions;
    this.totalExpensesAmount = totalExpensesAmount;
    this.totalIncome = totalIncome;
    this.remainingBalance = remainingBalance;

    if (ExpensesIncome.instance) {
      return ExpensesIncome.instance;
    }

    ExpensesIncome.instance = this;
  }

  @action fetchExpenses = async () => {
    this.setLoading(true);
    const response = await api.expenses.getAll(this.userId);
    if (response) {
      this.setExpenses(response);
    }
    this.setLoading(false);
  };

  @action addIncomeBalanceTransaction = async (
    balance: number,
    transaction: any,
  ) => {
    this.setLoading(true);

    const newTotalIncome = this.totalIncome + balance;
    const newRemainingBalance = this.remainingBalance + balance;

    const newTransactions = [...this.transactions, transaction];

    const responseIncomeBalance = await api.income.addBalance(
      this.userId,
      newTotalIncome,
      newRemainingBalance,
    );

    const responseIncomeTransaction = await api.income.addTransactio(
      this.userId,
      newTransactions,
    );

    if (responseIncomeBalance && responseIncomeTransaction) {
      this.totalIncome = newTotalIncome;
      this.remainingBalance = newRemainingBalance;
      this.transactions = newTransactions;
      Navigator.goBack();
    }
    this.setLoading(false);
  };

  @action addExpensesBalanceTransaction = async (
    balance: number,
    transaction: any,
  ) => {
    this.setLoading(true);

    const newTotalExpensesAmount = this.totalExpensesAmount + balance;
    const newRemainingBalance = this.remainingBalance - balance;

    const newTransactions = [...this.transactions, transaction];

    const responseBalance = await api.expenses.addBalance(
      this.userId,
      newTotalExpensesAmount,
      newRemainingBalance,
    );

    const responseIncomeTransaction = await api.expenses.addTransactio(
      this.userId,
      transaction,
    );

    const responseTransaction = await api.income.addTransactio(
      this.userId,
      newTransactions,
    );

    if (responseBalance && responseIncomeTransaction && responseTransaction) {
      this.totalExpensesAmount = newTotalExpensesAmount;
      this.remainingBalance = newRemainingBalance;
      this.transactions = newTransactions;
      Navigator.goBack();
    }
    this.setLoading(false);
  };

  @action setExpenses = (totalExpensesItems: any[]) => {
    this.totalExpensesItems = totalExpensesItems;
  };

  @computed get groupedByCategoryTotalExpensesItems() {
    return groupByCategory(this.totalExpensesItems);
  }

  @action private setLoading(state: boolean) {
    this.loading = state;
  }
}

export default ExpensesIncome;
