import React from 'react';
import { observer } from 'mobx-react';
import PieChartComponent from '../../../../core/kit/atmos/PieChart';
import styled from 'styled-components/native';
import User from '../../../../core/services/user/User';
import { getColorByAmount } from '../../../../core/utils/helper';
import Card from '../../../../core/kit/atmos/Card';
import { useTheme } from '../../../../core/styles/theme/ThemeProvider';
import EmptyText from '../../../../core/kit/atmos/EmptyText';

const usersService = new User();

const PieChartComponentContainer = () => {
    const theme = useTheme();

    const pieData = usersService.groupedByCategoryTotalExpensesItems?.map((item: any) => ({
        name: item.category,
        amount: item.amount,
        color: getColorByAmount(item.amount),
        legendFontColor: theme.colors.mainTextColor,
        legendFontSize: 12,
    })) || [];

    // we should return null if there is no data
    if (!pieData.length) {
        return <EmptyText>no expenses to show the chart add expenses to see it</EmptyText>;
    }
    return (
        <Container>
            <PieChartComponent data={pieData} />
        </Container>
    );
};

const Container = styled(Card)(({ theme }) => ({
    margin: theme.rems.x2,
    marginRight: theme.rems.x3,
    marginBottom: theme.rems.x1,
}));

export default observer(PieChartComponentContainer);

