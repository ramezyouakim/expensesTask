import {Dimensions} from 'react-native';

import {light} from './ColorsPalette';
import {fonts} from './Fonts';
import rems from './Rems';

import {Theme} from './Types';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const defaultTheme: Theme = {
  colors: light,
  fonts: fonts,
  rems: rems,
  dimensions: {
    window: {
      width: windowWidth,
      height: windowHeight,
    },
    screen: {
      width: screenWidth,
      height: screenHeight,
    },
  },
};
