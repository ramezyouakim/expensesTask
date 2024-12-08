import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../styles/theme/ThemeProvider';

type PieChartData = {
  name: string,
  amount: number,
  color: string,
  legendFontColor: string,
  legendFontSize: number,
};

interface PieChartComponentProps {
  data: PieChartData[];
}

const PieChartComponent = ({ data }: PieChartComponentProps) => {
  const theme = useTheme();

  return (
    <PieChart
      data={data}
      width={theme.dimensions.window.width - 26}
      height={theme.dimensions.window.height * 0.3}
      chartConfig={{
        color: () => theme.colors.gray,
      }}
      accessor="amount"
      backgroundColor="transparent"
      paddingLeft={theme.rems.x1.toString()}
    />
  );
};

export default PieChartComponent;
