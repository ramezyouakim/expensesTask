import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Navigator from '../../../../routes/Navigator';
import { routes } from '../../../../routes/routes';

const AddNewHeaderButton = () => {
    const goToAddNew = () => Navigator.navigateTo({ routeName: routes.main.addNew });

    return (
        <TouchableOpacity onPress={goToAddNew}>
            <Text>
                Add
            </Text>
        </TouchableOpacity>
    );
};

export default AddNewHeaderButton;
