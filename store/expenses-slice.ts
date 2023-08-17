import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExpenseItem } from '../components/ExpensesOutput/ExpenseItem';

export interface ExpenseItem {
  id: string;
  desc: string;
  date: string;
  amount: number;
}

interface SliceState {
  expenses: ExpenseItem[];
}

const initialState: SliceState = { expenses: [] };

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<ExpenseItem[]>) => {
      state.expenses = action.payload;
    },
    addExpenses: (state, action: PayloadAction<ExpenseItem>) => {
      state.expenses.push(action.payload);
    },
    removeExpenses: (state, action: PayloadAction<ExpenseItem>) => {
      state.expenses.splice(
        state.expenses.indexOf(
          state.expenses.find(
            (el) => el.id === action.payload.id
          ) as ExpenseItem
        ),
        1
      );
    },
    updateExpenses: (state, action: PayloadAction<ExpenseItem>) => {
      state.expenses.splice(
        state.expenses.indexOf(
          state.expenses.find(
            (el) => el.id === action.payload.id
          ) as ExpenseItem
        ),
        1,
        action.payload
      );
    },
  },
});

export const setExpenses = expensesSlice.actions.setExpenses;
export const addExpenses = expensesSlice.actions.addExpenses;
export const removeExpenses = expensesSlice.actions.removeExpenses;
export const updateExpenses = expensesSlice.actions.updateExpenses;

export default expensesSlice.reducer;
