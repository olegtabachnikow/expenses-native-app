import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseItem } from '../../store/expenses-slice';

interface ExpensesSummaryProps {
  expenses: ExpenseItem[];
  period: string;
}

export const ExpensesSummary: FC<ExpensesSummaryProps> = ({
  expenses,
  period,
}) => {
  const expensesSum = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{period}</Text>
      <Text style={styles.totalAmountText}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodText: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  totalAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
