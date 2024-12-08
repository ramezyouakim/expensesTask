import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = {
  label: string
  onPressHandler: () => void
}

const Button = ({
  label,
  onPressHandler,
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer {...props} onPress={onPressHandler}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
}));

const ButtonText = styled.Text(({ theme }) => ({
  marginHorizontal: theme.rems.x14,
  marginVertical: theme.rems.x2,
  color: theme.colors.gray,
  fontWeight: 'bold',
  textAlign: 'center'
}));

export default Button;
