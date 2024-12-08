import {action, makeObservable, observable} from 'mobx';
import {ServiceAppStartHandler} from './types';

class Services {
  private static instance: any;
  @observable private appStartHandlers: ServiceAppStartHandler[];
  loading: boolean;

  constructor() {
    this.appStartHandlers = [];
    this.loading = false;

    makeObservable(this);

    if (Services.instance) {
      return Services.instance;
    }

    Services.instance = this;
  }

  @action registerAppStartHandler(element: ServiceAppStartHandler) {
    this.appStartHandlers.push(element);
  }

  @action private setLoading(state: boolean) {
    this.loading = state;
  }

  // this method is used to initialize all services that need to called before the app fully starts
  // we can add another one to initialize all services that can run in the background even if the app is loaded
  @action async init(): Promise<void> {
    try {
      this.setLoading(true);
      const promises = this.appStartHandlers.map(item => {
        if (item.onAppStart) {
          return item.onAppStart();
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }
}

export default new Services();
