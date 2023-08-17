import axios from 'axios';

const BASE_URL =
  'https://react-native-expenses-92ef6-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData: {
  amount: string;
  desc: string;
  date: string;
}) {
  const response = await axios.post(`${BASE_URL}expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BASE_URL}expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      desc: response.data[key].desc,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id: string, expenseData: any) {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id: string) {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
}
