import { FC } from 'react';
import { FlatList } from 'react-native';
import { ExpenseItem } from './ExpenseItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ExpenseItem as ExpenseItemType } from '../../store/expenses-slice';

function renderExpenseItem(itemData: any) {
  return <ExpenseItem item={itemData.item} />;
}

interface ExpensesListProps {
  expenses: ExpenseItemType[];
}

export const ExpensesList: FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};
