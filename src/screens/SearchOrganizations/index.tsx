import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';

import { IconInput } from '@Components/ui/IconInput';
import { IOrganization } from '@Models/organization';
import { OrganizationService } from '@Services/organization-service';
import { colors } from '@Theme/colors';

import { EmptySearchList } from './components/EmptySearchList';
import { SearchItem } from './components/SearchItem';
import { SearchItemSeparator } from './components/SearchItemSeparator';
import { styles } from './styles';

export function SearchOrganizationsScreen() {
  const [searchResult, setSearchResult] = useState<IOrganization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 950);

  function onChangeSearchTerm(value: string) {
    setSearchTerm(value);
  }

  useEffect(() => {
    const searchOrganizations = async () => {
      try {
        if (!searchTerm) {
          setSearchResult([]);

          return;
        }

        if (debouncedSearchTerm) {
          const result =
            await OrganizationService.searchMany(debouncedSearchTerm);

          if (result.status === 200) {
            setSearchResult(result.data.queryResult);
          }
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível concluir sua requisição. Por favor, tente novamente mais tarde.',
        );
      }
    };

    searchOrganizations();
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.searchItemsListContainer}>
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={SearchItemSeparator}
        ListHeaderComponent={
          <IconInput
            iconProps={{
              iconName: 'search',
              color: colors.text.main,
              size: 24,
            }}
            placeholder="Procurar por ONGs"
            onChangeText={onChangeSearchTerm}
            value={searchTerm}
          />
        }
        renderItem={({ item }) => (
          <SearchItem
            profilePictureURL={item.profilePictureURL}
            title={item.title}
            username={item.username}
          />
        )}
        ListEmptyComponent={<EmptySearchList query={debouncedSearchTerm} />}
      />
    </View>
  );
}
