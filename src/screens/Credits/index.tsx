import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import BOLT from '@Assets/images/bolt.jpg';

import { styles } from './styles';

export function CreditsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={[styles.baseText, styles.heading]}>Créditos</Text>

      <Text style={[styles.baseText, styles.creatorText]}>
        Desenvolvido por:
      </Text>
      <Text style={[styles.baseText, styles.creatorText]}>
        Pietro Piva Vieira
      </Text>

      <View style={styles.textContainer}>
        <Text style={[styles.baseText, styles.creditsText]}>
          Este aplicativo é uma simples homenagem ao meu pequeno amigo Bolt, que
          já se foi a muito tempo. Eu te amo muito amigão, um dia te encontro de
          novo 🐶❤
        </Text>
      </View>
      <Image source={BOLT} style={styles.image} />
    </View>
  );
}
