import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { observer } from 'mobx-react';
import { styled } from 'styled-components/native';
import User from '../../../core/services/user/User';
import EmptyText from '../../../core/kit/atmos/EmptyText';

const usersService = new User();

const TransactionsHistoryScreen: React.FC = () => {
    const renderItem: ListRenderItem<{ name: string, type: string, amount: string }> = useCallback(
        ({ item }) => (
            <ItemContainer>
                <View>
                    <ItemText>{item?.name || 'N/A'}</ItemText>
                    <ItemText>{item?.type || 'N/A'}</ItemText>
                </View>
                <ItemText>£ {item?.amount || 0}</ItemText>
            </ItemContainer>
        ),
        []
    );

    const renderEmptyList = () => <EmptyText>No transactions found.</EmptyText>;

    const keyExtractor = useCallback(
        (item: any, index: number) => `${index.toString()}-${item?.id}`,
        []
    );
    console.log(usersService.transactions)
    return (
        <Container>
            <FlatList
                data={usersService.transactions}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListEmptyComponent={renderEmptyList}
            />
        </Container>
    );
};


const Container = styled.View({
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
});

const ItemContainer = styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
});

const ItemText = styled.Text({
    fontSize: 16,
});

export default observer(TransactionsHistoryScreen);
