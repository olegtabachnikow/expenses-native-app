import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseItem } from '../../store/expenses-slice';

interface ExpensesOutputProps {
  expenses: ExpenseItem[];
  expensesPeriod: string;
  fallbackText: string;
}

export const ExpensesOutput: FC<ExpensesOutputProps> = ({
  expenses,
  expensesPeriod,
  fallbackText,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={expensesPeriod} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
