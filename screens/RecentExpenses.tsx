import { FC, useEffect, useState } from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import { setExpenses } from '../store/expenses-slice';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

type RecentExpensesScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  'RecentExpenses'
>;

export const RecentExpenses: FC<RecentExpensesScreenProps> = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (err) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError('');
  }

  const allExpenses = useSelector(
    (state: RootState) => state.expenseReducer.expenses
  );
  const recentExpenses = allExpenses.filter((el) => {
    const today = new Date().toISOString();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return new Date(el.date) > date7DaysAgo && new Date(el.date) <= new Date();
  });
  if (error.length && !isFetching) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
};
