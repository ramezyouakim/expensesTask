import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  size: 'large',
  color: theme.colors.mainColor,
}))(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.rems.x15 * 3,
}));

export default LoadingIndicator;
