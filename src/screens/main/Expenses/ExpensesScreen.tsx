/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, ScrollView, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { expensesIncomeService } from '../../../core/services';
import LoadingIndicator from '../../../core/kit/atmos/LoadingIndicator';
import { observer } from 'mobx-react';
import { formatDate } from '../../../core/utils/helper';
import EmptyText from '../../../core/kit/atmos/EmptyText';

type ExpenseItem = {
    id: string;
    name: string;
    createdAt: string;
    amount: number;
};

type CategoryItem = {
    category: string;
    items: ExpenseItem[];
};

const ExpensesScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        expensesIncomeService.fetchExpenses();
    }, []);

    useEffect(() => {
        if ((expensesIncomeService.groupedByCategoryTotalExpensesItems as CategoryItem[])?.length) {
            setSelectedCategory(
                (expensesIncomeService.groupedByCategoryTotalExpensesItems as CategoryItem[])[0]?.category || ''
            );
        }
    }, [expensesIncomeService.groupedByCategoryTotalExpensesItems]);

    const handleCategorySelect = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const header = useMemo(() => {
        return (
            <CategoriesContainer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {(expensesIncomeService.groupedByCategoryTotalExpensesItems as CategoryItem[]).map((catItem) => (
                        <CategoryButton
                            key={catItem.category}
                            selected={selectedCategory === catItem.category}
                            onPress={() => handleCategorySelect(catItem.category)}
                        >
                            <CategoryText selected={selectedCategory === catItem.category}>
                                {catItem.category}
                            </CategoryText>
                        </CategoryButton>
                    ))}
                </ScrollView>
            </CategoriesContainer>
        );
    }, [expensesIncomeService.groupedByCategoryTotalExpensesItems, selectedCategory, handleCategorySelect]);

    const renderItem: ListRenderItem<ExpenseItem> = useCallback(
        ({ item }) => (
            <ItemContainer>
                <ItemText>{item?.name || 'N/A'}</ItemText>
                <ItemText>{formatDate(item?.createdAt)}</ItemText>
                <ItemText>£ {item?.amount || 0}</ItemText>
            </ItemContainer>
        ),
        []
    );

    const renderEmptyList = useMemo(() => {
        return (
            <EmptyText>
                {(expensesIncomeService.groupedByCategoryTotalExpensesItems as CategoryItem[])?.length
                    ? 'No items found for the selected category.'
                    : 'No categories available.'}
            </EmptyText>
        );
    }, [expensesIncomeService.groupedByCategoryTotalExpensesItems]);

    const keyExtractor = useCallback(
        (item: ExpenseItem, index: number) => `${index.toString()}-${item?.id}`,
        []
    );

    const items = useMemo(() => {
        if (!selectedCategory) { return []; }
        return (
            (expensesIncomeService.groupedByCategoryTotalExpensesItems as CategoryItem[]).find(
                (catItem) => catItem.category === selectedCategory
            )?.items || []
        );
    }, [selectedCategory, expensesIncomeService.groupedByCategoryTotalExpensesItems]);

    if (expensesIncomeService.loading) {
        return <LoadingIndicator />;
    }

    return (
        <Container>
            <FlatList
                data={items}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={header}
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

const CategoriesContainer = styled.View({
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
});

const CategoryButton = styled.TouchableOpacity<{ selected: boolean }>(({ selected }) => ({
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: selected ? '#007BFF' : '#f0f0f0',
}));

const CategoryText = styled.Text<{ selected: boolean }>(({ selected }) => ({
    fontSize: 16,
    color: selected ? '#fff' : '#333',
    fontWeight: selected ? 'bold' : 'normal',
}));

const ItemContainer = styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
});

const ItemText = styled.Text({
    fontSize: 16,
});

export default observer(ExpensesScreen);
