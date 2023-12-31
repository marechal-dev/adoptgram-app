import { Text, View } from 'react-native';

import { styles } from './styles';

type CommentProps = {
  username: string;
  content: string;
};

export function Comment({ username, content }: CommentProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.baseText, styles.username]}>{username}</Text>
      <Text style={[styles.baseText]}>{content}</Text>
    </View>
  );
}
