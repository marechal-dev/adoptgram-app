import { Text, View } from 'react-native';

import { styles } from './styles';

type EmptySearchListProps = {
  query: string;
};

export function EmptySearchList({ query }: EmptySearchListProps) {
  const textToShow = !query ? (
    <Text style={[styles.baseText, styles.emptyText]}>
      Utilize o campo acima para pesquisar por Organizações
    </Text>
  ) : (
    <>
      <Text style={[styles.baseText, styles.title]}>Ops!</Text>
      <Text style={[styles.baseText, styles.emptyText]}>
        Nenhum resultado encontrado para {`"${query}"`}
      </Text>
    </>
  );

  return <View>{textToShow}</View>;
}
