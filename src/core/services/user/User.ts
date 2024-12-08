import {action, computed, makeObservable, observable} from 'mobx';
import Services from '../Main';
import {USER} from './types';
import {api} from '../backend/api';
import {groupByCategory} from '../../utils/helper';

class User {
  private static instance: User;

  @observable createdAt: string = new Date().toISOString();
  @observable name: string = '';
  @observable avatar: string = '';
  @observable totalExpensesAmount: number = 0;
  @observable categories: string[] = [];
  @observable totalExpensesItems: [] = [];
  @observable totalIncome: number = 0;
  @observable transactions: [] = [];
  @observable remainingBalance = 0;
  @observable id: string = '';

  @observable loading: boolean = false;

  constructor() {
    makeObservable(this);

    if (User.instance) {
      return User.instance;
    }

    User.instance = this;

    Services.registerAppStartHandler(this);
  }

  @action async onAppStart() {
    await this.fetchUserInfo();
  }

  @action async refresh() {
    await this.fetchUserInfo();
  }

  // since there is no auth we will always pass the id with one
  @action fetchUserInfo = async () => {
    this.setLoading(true);
    const response = await api.user.profile('1');
    if (response) {
      this.setUser(response);
    }
    this.setLoading(false);
  };

  @computed get userInfo() {
    return {
      createdAt: this.createdAt,
      name: this.name,
      avatar: this.avatar,
      totalExpensesAmount: this.totalExpensesAmount,
      categories: this.categories,
      totalExpensesItems: this.totalExpensesItems,
      totalIncome: this.totalIncome,
      id: this.id,
      transactions: this.transactions,
      remainingBalance: this.remainingBalance,
    };
  }

  @computed get groupedByCategoryTotalExpensesItems() {
    return groupByCategory(this.totalExpensesItems);
  }

  // we can creaet a setter to each one
  @action async setUser(user: USER) {
    this.createdAt = user.createdAt;
    this.name = user.name;
    this.avatar = user.avatar;
    this.totalExpensesAmount = user.totalExpensesAmount;
    this.categories = user.categories;
    this.totalExpensesItems = user.totalExpensesItems;
    this.totalIncome = user.totalIncome;
    this.id = user.id;
    this.transactions = user.transactions;
    this.remainingBalance = user.remainingBalance;
  }

  @action async setTotalExpensesItems(totalExpensesItems: []) {
    this.totalExpensesItems = totalExpensesItems;
  }

  @action private setLoading(state: boolean) {
    this.loading = state;
  }
}

export default User;
