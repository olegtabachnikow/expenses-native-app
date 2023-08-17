import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenses-slice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    expenseReducer: expenseReducer,
  },
});

export default store;
