import React, { useCallback } from 'react';
import { Platform, UIManager } from 'react-native';
import { observer } from 'mobx-react';
import UserInfoCardContainer from './components/UserInfoCardContainer';
import PieChartComponentContainer from './components/PieChartComponentContainer';
import styled from 'styled-components/native';
import User from '../../../core/services/user/User';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../../../core/kit/atmos/LoadingIndicator';
import TransactionHistroyButton from './components/TransactionHistroyButton';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const usersService = new User();

const HomeScreen = () => {

  useFocusEffect(useCallback(() => {
    usersService.refresh();
  }, []));

  if (usersService.loading) { return <LoadingIndicator />; }

  return (
    <Container>
      <PieChartComponentContainer />
      <UserInfoCardContainer />
      <TransactionHistroyButton />
    </Container>
  );
};

const Container = styled.View({
  flex: 1,
});

export default observer(HomeScreen);
