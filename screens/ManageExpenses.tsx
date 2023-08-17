import { FC, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../App';
import { IconButton } from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExpenseItem,
  addExpenses,
  removeExpenses,
  updateExpenses,
} from '../store/expenses-slice';
import { RootState } from '../store/store';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { ErrorOverlay } from '../components/ui/ErrorOverlay';

type ManageExpensesScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'ManageExpense'
>;

export const ManageExpenses: FC<ManageExpensesScreenProps> = ({
  route,
  navigation,
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const editedExpenseId = route.params?.expenseId;
  const expenses = useSelector(
    (state: RootState) => state.expenseReducer.expenses
  );
  const currentItem = expenses.find((el) => el.id === editedExpenseId);
  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const dispatch = useDispatch();

  async function deleteExpenseHandler() {
    setIsFetching(true);
    dispatch(removeExpenses(currentItem as ExpenseItem));
    try {
      await deleteExpense(editedExpenseId as string);
      navigation.goBack();
    } catch (err) {
      setError('Could not delete expense!');
      setIsFetching(false);
    }
  }

  function errorHandler() {
    setError('');
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: any) {
    setIsFetching(true);
    if (isEditing) {
      dispatch(
        updateExpenses({ ...expenseData, id: editedExpenseId } as ExpenseItem)
      );
      try {
        await updateExpense(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError('Could not update. Something goes wrong!');
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        dispatch(
          addExpenses({
            ...expenseData,
            id,
          } as ExpenseItem)
        );
        navigation.goBack();
      } catch (err) {
        setError('Could not add expense. Something goes wrong!');
      }
    }
  }

  if (error.length && !isFetching) {
    return <ErrorOverlay message={error} onPress={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.contaner}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        initValues={currentItem}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
