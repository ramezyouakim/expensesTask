export type RemMap = {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x6: number;
  x7: number;
  x8: number;
  x9: number;
  x10: number;
  x11: number;
  x12: number;
  x13: number;
  x14: number;
  x15: number;
};

// we can add color pallete here
// for exmaple 400, 500, 600, 700, 800, 900 diffrent shades of the same color
export type ColorMap = {
  mainColor: string;
  mainTextColor: string;
  gray: string;
  darkGray: string;
};

export type FontMap = {
  header1: number;
  header2: number;
  header3: number;
  header4: number;
};

export type DimensionMap = {
  window: DeviceDimensions;
  screen: DeviceDimensions;
};

export type DeviceDimensions = {
  width: number;
  height: number;
};

export type Theme = {
  colors: ColorMap;
  fonts: FontMap;
  rems: RemMap;
  dimensions: DimensionMap;
};
