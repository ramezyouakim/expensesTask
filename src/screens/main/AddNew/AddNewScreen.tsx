import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInput from '../../../core/kit/atmos/TextInput';
import Button from '../../../core/kit/atmos/Button';
import User from '../../../core/services/user/User';
import { expensesIncomeService } from '../../../core/services';

const usersService = new User();

const AddNewScreen = () => {
    const [type, setType] = useState('income');
    const [open, setOpen] = useState(false);

    // don't add Expenses if there is no income
    const [items, setItems] = useState(() => {
        const initialItems = [{ label: 'Income', value: 'income' }];
        if (usersService.userInfo.totalIncome !== 0) {
            initialItems.push({ label: 'Expenses', value: 'expenses' });
        }
        return initialItems;
    });
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const validateNotEmpty = (text: string) => text.trim().length > 0;
    const validateAmount = (text: string) => /^\d+(\.\d{1,2})?$/.test(text);

    const handleSubmit = () => {
        if (!validateNotEmpty(name) || !validateAmount(amount) || !validateNotEmpty(category)) {
            Alert.alert('Error', 'Please fill out all fields with valid data.');
            return;
        }

        const tranaction = {
            name,
            amount,
            category,
            type,
        }
        if (type === 'income') {
            expensesIncomeService.addIncomeBalanceTransaction(parseFloat(amount), tranaction);
        } else {
            expensesIncomeService.addExpensesBalanceTransaction(parseFloat(amount), tranaction);
        }
        Alert.alert('Success', 'Transaction Added');
    };

    return (
        <Container>
            {usersService.userInfo.totalIncome == 0 && <Label> Add income so you will be able to add expenses</Label>}
            <Label>Type</Label>
            <StyledDropDownPicker
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
                setItems={setItems}
            />

            <TextInput
                label="Name"
                placeholder="Enter name"
                validator={validateNotEmpty}
                validationError="Name is required."
                onTextChange={setName}
            />

            <TextInput
                label="Amount"
                placeholder="Enter amount"
                validator={validateAmount}
                validationError="Enter a valid amount."
                onTextChange={setAmount}
            />

            <TextInput
                label="Category"
                placeholder="Enter category"
                validator={validateNotEmpty}
                validationError="Category is required."
                onTextChange={setCategory}
            />

            <SubmitButton label="Submit" onPressHandler={handleSubmit} />

        </Container >
    );
};

export default AddNewScreen;

const Container = styled.View({
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    gap: 20,
});

const Label = styled.Text({
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
});

const StyledDropDownPicker = styled(DropDownPicker)({
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginBottom: 15,
});

const SubmitButton = styled(Button)({
    marginTop: 20,
});
