import * as React from 'react';
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Navigator from './Navigator';
import MainNavigator from './MainNavigator';
import { observer } from 'mobx-react';
import { routes } from './routes';
import LoadingIndicator from '../core/kit/atmos/LoadingIndicator';
import FallbackScreen from '../core/modules/FallbackScreen';
import { useEffect } from 'react';
import MainServices from '../core/services/Main';

// we can handle auth for exmaple to show login screen if user is not logged in
// or show home screen if user is logged in

const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    onRefChange(navigationRef);
  }, [navigationRef]);

  useEffect(() => {
    MainServices.init();
  }, []);

  const onRefChange = (
    ref: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
  ) => {
    if (ref) {
      Navigator.setNavigtor = ref;
    }
  };

  if (MainServices.loading) {
    return <LoadingIndicator />;
  }

  const renderStageNav = (): React.ReactNode => {
    const navgtionDestination = Navigator.getNavgtionDestination();
    try {
      switch (navgtionDestination) {
        case routes.main.dashboard:
          return <MainNavigator />;
      }
    } catch (error) {
      return <FallbackScreen />;
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {renderStageNav()}
    </NavigationContainer>
  );
};

export default observer(AppNavigator);
