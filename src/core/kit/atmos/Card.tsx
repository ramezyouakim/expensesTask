import { View } from 'react-native';
import styled from 'styled-components';

const Card = styled(View)(({
  borderRadius: 10,
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: '0.27',
  shadowRadius: '4.65px',

  elevation: '6',
}));

export default Card;
