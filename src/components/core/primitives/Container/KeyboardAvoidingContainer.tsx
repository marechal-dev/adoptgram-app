import { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { styles } from './styles';

export type KeyboardAvoidingContainerProps = {
  behavior?: 'position' | 'height' | 'padding';
  children: ReactNode;
};

export function KeyboardAvoidingContainer({
  behavior,
  children,
}: KeyboardAvoidingContainerProps) {
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.kbAvoidingContainerDefault}
      style={styles.kbAvoidingContainerDefault}
      behavior={behavior}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
