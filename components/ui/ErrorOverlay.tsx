import { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { CustomButton } from './CustomButton';

interface ErrorOverlayProps {
  message: string;
  onPress: () => void;
}

export const ErrorOverlay: FC<ErrorOverlayProps> = ({ message, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
      <CustomButton onPress={onPress}>Okay</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: { color: 'white', textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: 'bold' },
  message: {
    fontSize: 14,
  },
});
