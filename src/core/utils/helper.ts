import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const groupByCategory = (items: Array<any>) => {
  const grouped = items.reduce((acc, item) => {
    const {category, amount} = item;

    if (!acc[category]) {
      acc[category] = {
        category,
        amount: 0,
        items: [],
      };
    }

    acc[category].amount += parseFloat(amount);
    acc[category].items.push(item);

    return acc;
  }, {});

  return Object.values(grouped);
};

export const getColorByAmount = (amount: number): string => {
  const logValue = Math.log(amount + 1);
  const normalizedValue = Math.min(logValue / 10, 1);

  const hue = 240 - normalizedValue * 240 + (amount % 20) * 2;

  const saturation = 50 + normalizedValue * 30 + (amount % 10);
  const lightness = 40 + normalizedValue * 20 + (amount % 15);

  const clampedHue = Math.max(0, Math.min(hue, 360));
  const clampedSaturation = Math.max(30, Math.min(saturation, 100));
  const clampedLightness = Math.max(20, Math.min(lightness, 80));

  return `hsl(${clampedHue}, ${clampedSaturation}%, ${clampedLightness}%)`;
};

export const formatDate = (dateInput: string) => {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
