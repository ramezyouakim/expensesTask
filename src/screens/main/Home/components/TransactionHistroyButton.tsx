import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ICard from '../../../../core/kit/atmos/Card';
import Navigator from '../../../../routes/Navigator';
import { routes } from '../../../../routes/routes';

const TransactionHistroyButton = () => {
    const goToTransactionHistroy = () => Navigator.navigateTo({ routeName: routes.main.transactionHistroy });

    return (
        <TouchableOpacity onPress={goToTransactionHistroy}>
            <Card>
                <Row>
                    <TileText>Transactions Histroy</TileText>
                    {<CliclIcon>{'▶'}</CliclIcon>}
                </Row>
            </Card>
        </TouchableOpacity>
    );
};

export default TransactionHistroyButton;

const Card = styled(ICard)(({ theme }) => ({
    height: 50,
    justifyContent: 'center',
    margin: theme.rems.x2,
    borderRadius: 10,
    paddingLeft: theme.rems.x3,
}));

const TileText = styled.Text(({ theme }) => ({
    color: theme.colors.mainColor,
    fontSize: 16,
    fontWeight: 'bold',
}));

const Row = styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const CliclIcon = styled.Text(({ theme }) => ({
    color: theme.colors.mainColor,
    fontSize: 25,
    marginRight: theme.rems.x2,
}));
