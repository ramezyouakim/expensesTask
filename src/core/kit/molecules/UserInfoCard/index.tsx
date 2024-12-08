import React from 'react';
import Card from '../../atmos/Card';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';

interface UserInfoCardProps {
    name: string;
    income: number;
    expenses: number;
    remainingBalance: number;
    onPressHanlder?: () => void
}

const UserInfoCard = ({ name, income, expenses, remainingBalance, onPressHanlder }: UserInfoCardProps) => {
    return (
        <Container>
            <ItemCard>
                <TileText>Hello</TileText>
                <TileSubText>{name}</TileSubText>
            </ItemCard>
            <ItemCard>
                <TileText>Income</TileText>
                <TileSubText>£ {income}</TileSubText>
            </ItemCard>
            <TouchableOpacity onPress={onPressHanlder} disabled={!onPressHanlder}>
                <ItemCard>
                    <Row>
                        <View>
                            <TileText>Expenses</TileText>
                            <TileSubText>£ {expenses}</TileSubText>
                        </View>
                        {onPressHanlder && <CliclIcon>{'▶'}</CliclIcon>}
                    </Row>
                </ItemCard>
            </TouchableOpacity>
            <ItemCard>
                <TileText>Remaining</TileText>
                <TileSubText>£ {remainingBalance}</TileSubText>
            </ItemCard>
        </Container>
    );
};

export default UserInfoCard;

const Container = styled.View(({ theme }) => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.rems.x2,
}));

const ItemCard = styled(Card)(({ theme }) => ({
    width: (theme.dimensions.window.width - theme.rems.x7) / 2,
    height: 75,
    justifyContent: 'center',
    marginBottom: theme.rems.x2,
    borderRadius: 10,
    paddingLeft: theme.rems.x3,
    marginRight: theme.rems.x1,
}));

const TileText = styled.Text(({ theme }) => ({
    color: theme.colors.mainColor,
    fontSize: 16,
    fontWeight: 'bold',
}));

const TileSubText = styled(TileText)(({ theme }) => ({
    color: theme.colors.mainTextColor,
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
