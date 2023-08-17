import { FC } from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface AllExpensesProps {}

export const AllExpenses: FC<AllExpensesProps> = () => {
  const allExpenses = useSelector(
    (state: RootState) => state.expenseReducer.expenses
  );
  return (
    <ExpensesOutput
      expenses={allExpenses}
      expensesPeriod='Total'
      fallbackText='No registered expenses found'
    />
  );
};
