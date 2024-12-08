import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { routes } from './routes';
import HomeScreen from '../screens/main/Home/HomeScreen';
import ExpensesScreen from '../screens/main/Expenses/ExpensesScreen';
import TransactionsHistoryScreen from '../screens/main/TransactionsHistory/TransactionsHistoryScreen';
import AddNewScreen from '../screens/main/AddNew/AddNewScreen';
import AddNewHeaderButton from '../core/kit/molecules/AddNewHeaderButton';

const MainStack = createNativeStackNavigator();

const AddNewButton = () => <AddNewHeaderButton />;

const MainNavigator = () => {
  return (
    <>
      <MainStack.Navigator>
        <MainStack.Group>
          <MainStack.Screen
            name={routes.main.dashboard}
            component={HomeScreen}
            options={{ title: 'Dashboard', headerRight: AddNewButton }}
          />

          <MainStack.Screen
            name={routes.main.expenses}
            component={ExpensesScreen}
            options={{ title: 'Expenses' }}
          />

          <MainStack.Screen
            name={routes.main.transactionHistroy}
            component={TransactionsHistoryScreen}
            options={{ title: 'Transactions History' }}
          />

          <MainStack.Screen
            name={routes.main.addNew}
            component={AddNewScreen}
            options={{ title: 'Add New' }}
          />
        </MainStack.Group>
      </MainStack.Navigator>
    </>
  );
};

export default observer(MainNavigator);
