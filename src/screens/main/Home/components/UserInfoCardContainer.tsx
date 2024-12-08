import React from 'react';
import UserInfoCard from '../../../../core/kit/molecules/UserInfoCard';
import User from '../../../../core/services/user/User';
import { observer } from 'mobx-react';
import Navigator from '../../../../routes/Navigator';
import { routes } from '../../../../routes/routes';

const usersService = new User();

const UserInfoCardContainer = () => {
    const onExpensesPress = () => Navigator.navigateTo({ routeName: routes.main.expenses });

    return <UserInfoCard
        name={usersService.userInfo.name}
        income={usersService.userInfo.totalIncome}
        expenses={usersService.userInfo.totalExpensesAmount}
        remainingBalance={usersService.userInfo.remainingBalance}
        onPressHanlder={usersService.userInfo.totalExpensesItems ? onExpensesPress : undefined}
    />;
};

export default observer(UserInfoCardContainer);
