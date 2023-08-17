import { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { CustomInput } from './CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { ExpenseItem } from '../../store/expenses-slice';
import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: any) => void;
  submitButtonLabel: string;
  initValues?: ExpenseItem;
}

interface InputValuesType {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  desc: { value: string; isValid: boolean };
}

export const ExpenseForm: FC<ExpenseFormProps> = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  initValues,
}) => {
  const [inputValues, setInputValues] = useState<InputValuesType>({
    amount: { value: '', isValid: true },
    date: { value: '', isValid: true },
    desc: { value: '', isValid: true },
  });

  useEffect(() => {
    !!initValues &&
      setInputValues({
        amount: { value: initValues.amount.toString(), isValid: true },
        date: { value: getFormattedDate(initValues.date), isValid: true },
        desc: { value: initValues.desc, isValid: true },
      });
  }, []);

  function inputChangeHandler(inputIdentifier: any, enteredValue: string) {
    setInputValues((state) => {
      return {
        ...state,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value).toISOString(),
      desc: inputValues.desc.value,
    };

    const amountIsValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descIsValid = expenseData.desc.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      //   Alert.alert('Invalid Input', 'Please check your input values');
      setInputValues((state) => {
        return {
          amount: { value: state.amount.value, isValid: amountIsValid },
          date: { value: state.date.value, isValid: dateIsValid },
          desc: { value: state.desc.value, isValid: descIsValid },
        };
      });
    } else {
      onSubmit(expenseData);
    }
  }
  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.date.isValid;
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.innerContainer}>
        <CustomInput
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
          style={styles.inputStyle}
          invalid={!inputValues.amount.isValid}
        />
        <CustomInput
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
          style={styles.inputStyle}
          invalid={!inputValues.date.isValid}
        />
      </View>
      <CustomInput
        label='Description'
        textInputConfig={{
          multiline: true,
          value: inputValues.desc.value,
          onChangeText: inputChangeHandler.bind(this, 'desc'),
        }}
        invalid={!inputValues.desc.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <CustomButton mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 80,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputStyle: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    margin: 8,
    color: GlobalStyles.colors.error500,
  },
});
