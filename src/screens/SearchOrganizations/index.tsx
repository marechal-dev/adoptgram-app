import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { IconInput } from '@Components/ui/IconInput';
import { OrganizationService } from '@Services/organization-service';
import { colors } from '@Theme/colors';

import { SearchItem } from './components/SearchItem';
import { SearchItemSeparator } from './components/SearchItemSeparator';
import { styles } from './styles';

const mocks = [
  {
    id: '1',
    profilePictureURL: 'https://source.unsplash.com/random/300x300',
    title: 'Lambeijos de Luz',
    username: 'lambeijos',
  },
  {
    id: '2',
    profilePictureURL: 'https://source.unsplash.com/random/300x300',
    title: 'Lambeijos de Luz',
    username: 'lambeijos',
  },
  {
    id: '3',
    profilePictureURL: 'https://source.unsplash.com/random/300x300',
    title: 'Lambeijos de Luz',
    username: 'lambeijos',
  },
];

export function SearchOrganizationsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function handleOnChangeSearchTerm(value: string) {
    setSearchTerm(value);
  }

  useEffect(() => {
    const searchOrganizations = async () => {
      try {
        if (debouncedSearchTerm) {
          const result =
            await OrganizationService.searchMany(debouncedSearchTerm);

          console.log(result);
        }
      } catch (error) {}
    };

    searchOrganizations();
  }, [debouncedSearchTerm]);

  return (
    <View style={styles.screenContainer}>
      <IconInput
        iconProps={{
          iconName: 'search',
          color: colors.text.main,
          size: 24,
        }}
        placeholder="Procurar por ONGs"
        onChangeText={handleOnChangeSearchTerm}
        value={searchTerm}
      />

      <View style={styles.searchItemsListContainer}>
        <FlatList
          data={mocks}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={SearchItemSeparator}
          renderItem={({ item }) => (
            <SearchItem
              profilePictureURL={item.profilePictureURL}
              title={item.title}
              username={item.username}
            />
          )}
        />
      </View>
    </View>
  );
}
