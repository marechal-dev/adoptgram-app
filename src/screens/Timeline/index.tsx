import { Text, View } from 'react-native';

type TimelineProps = {
  city: string;
};

export function Timeline({ city }: TimelineProps) {
  return (
    <View>
      <Text>Hello Timeline! {city}</Text>
    </View>
  );
}
