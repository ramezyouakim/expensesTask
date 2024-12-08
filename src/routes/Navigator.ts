import {routes} from './routes';
import {
  CommonActions,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {NavParams} from './types';

// we can handle auth for exmaple to show login screen if user is not logged in
// or show home screen if user is logged in

class Navigator {
  private static instance: any;

  constructor() {
    if (Navigator.instance) {
      return Navigator.instance;
    }

    Navigator.instance = this;
  }

  set setNavigtor(
    ref: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>,
  ) {
    Navigator.instance = ref;
  }

  getNavgtionDestination = () => {
    return routes.main.dashboard;
  };

  showMain = () => {
    try {
      const destination = this.getNavgtionDestination();

      this.reset({routeName: destination});
    } catch (error) {
      console.log('showMain ', error);
    }
  };

  navigateTo = ({routeName, routeParams}: NavParams) => {
    try {
      Navigator.instance.navigate(routeName, routeParams);
    } catch (error) {}
  };

  push = ({routeName, routeParams}: NavParams) => {
    try {
      Navigator.instance.push(routeName, routeParams);
    } catch (error) {}
  };

  reset = ({routeName, routeParams, position}: NavParams) => {
    try {
      Navigator.instance.dispatch(
        CommonActions.reset({
          index: position,
          routes: [{name: routeName, params: {...routeParams}}],
        }),
      );
    } catch (error) {}
  };

  goBack = () => {
    Navigator.instance.goBack();
  };
}

export default new Navigator();
