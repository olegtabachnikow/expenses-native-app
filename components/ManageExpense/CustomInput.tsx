import { FC } from 'react';
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface CustomInputProps {
  label: string;
  textInputConfig: TextInputProps;
  style?: ViewStyle;
  invalid: boolean;
}

export const CustomInput: FC<CustomInputProps> = ({
  label,
  textInputConfig,
  style,
  invalid,
}) => {
  let inputStyles: TextStyle[] = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles = [styles.input, styles.inputMultiline];
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[inputStyles, invalid && styles.invalidInput]}
        {...textInputConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
