import 'styled-components';

import {ColorMap, RemMap, FontMap, DimensionMap} from './Types';

// https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorMap;
    dark: boolean;
    fonts: FontMap;
    rems: RemMap;
    dimensions: DimensionMap;
  }
}
