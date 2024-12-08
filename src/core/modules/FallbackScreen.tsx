import React from 'react';
import RNRestart from 'react-native-restart';

import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Button from '../kit/atmos/Button';

const FallbackScreen = () => {
  /*
   * We can add reset or refresh logic to only re-try
   * the action that the user is trying to use, but just
   * for the sake of the task I'll leave it for now
   */
  const onPressHandler = () => {
    try {
      RNRestart.restart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header>
        Ops we are sorry but but something went worng
      </Header>
      <Button label={'Go Home'} onPressHandler={onPressHandler} />
    </Container>
  );
};

const Container = styled(View)({
  justifyContent: 'center',
  alignItems: 'center',
});

const Header = styled(Text)(({ theme }) => ({
  fontSize: theme.fonts.header2,
  textAlign: 'center',
  marginTop: theme.rems.x14,
  marginBottom: theme.rems.x4,
  color: theme.colors.mainTextColor,
  fontWeight: '500',
}));

export default FallbackScreen;
