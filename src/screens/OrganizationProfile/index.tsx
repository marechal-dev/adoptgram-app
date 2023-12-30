import { Image } from 'expo-image';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { IconTab } from '@Components/ui/IconTab';
import { IOrganizationProfile } from '@Models/organization-profile';
import { OrganizationProfileScreenProps } from '@Navigation/DetailsStack/types';

import { ProfileDetails } from './components/ProfileDetails';
import { ProfilePets } from './components/ProfilePets';
import { ProfilePosts } from './components/ProfilePosts';
import { styles } from './styles';

const MOCK_DATA: IOrganizationProfile = {
  id: '123',
  title: 'Lambeijos de Luz',
  representativeName: 'Pietro Piva Vieira',
  cnpj: 'XX.XXX.XXX/0001-XX',
  whatsapp: '(53) 98118-3178',
  followersCount: 1337,
  bio: 'Conheça a Lambeijos de Luz dqmwfqwoksmfqoawmsfqaokwsmfkoqamwskfmqowksmfqokwmfqokmwsfokqmawsokfmqaokwsmfokqamwsfkmqaokwsfmqkoeiqghiwjesngqwmfqokwsmfkqmawkeosmfqkowemngoqwjhogfqnwjsfnqowsmfdqkowmfokqmworoqjwoktqjkowsnfqokwmsfoqwmfokqwnmrqwijornq :)',
  telephone: '(53) 3222-4444',
  pixKey: '049.000.350-84',
  profilePictureUrl: 'https://source.unsplash.com/random/300x300',
  posts: [
    {
      id: '1',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '2',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '3',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '4',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '5',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '6',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '7',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '8',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '9',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '10',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '11',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '12',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '13',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '14',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
    {
      id: '15',
      createdAt: new Date(),
      likes: 2,
      medias: [
        {
          id: '1',
          type: 'image',
          url: 'https://source.unsplash.com/random/300x300',
        },
      ],
      textContent: 'Teste teste',
    },
  ],
  availablePets: [
    {
      id: '4',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
    {
      id: '5',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
    {
      id: '6',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
    {
      id: '7',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
    {
      id: '8',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
    {
      id: '9',
      name: 'Floppa',
      bio: 'Gosha Karr',
      age: 2,
      energyLevel: 'Medium',
      createdAt: new Date(),
      isCastrated: true,
      isVaccinated: true,
      profilePictureURL: 'https://source.unsplash.com/random/300x300',
      requireMedicalAttention: true,
      size: 'Big',
    },
  ],
};

type Tab = 'Details' | 'Posts' | 'Pets';

export function OrganizationProfileScreen({
  navigation,
  route,
}: OrganizationProfileScreenProps) {
  const [currentTab, setCurrentTab] = useState<Tab>('Details');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Perfil: ONG ${route.params.username}`,
    });
  }, [navigation, route]);

  useEffect(() => {}, []);

  function onChangeCurrentTab(tab: Tab) {
    setCurrentTab(tab);
  }

  let currentTabToRender = (
    <ProfileDetails
      representativeName={MOCK_DATA.representativeName}
      cnpj={MOCK_DATA.cnpj}
      whatsapp={MOCK_DATA.whatsapp}
      bio={MOCK_DATA.bio}
      pixKey={MOCK_DATA.pixKey}
      telephone={MOCK_DATA.telephone}
    />
  );

  if (currentTab === 'Posts') {
    currentTabToRender = <ProfilePosts posts={MOCK_DATA.posts} />;
  }

  if (currentTab === 'Pets') {
    currentTabToRender = (
      <ProfilePets
        pets={MOCK_DATA.availablePets}
        whatsapp={MOCK_DATA.whatsapp}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={MOCK_DATA.profilePictureUrl}
            style={styles.profilePicture}
          />

          <View style={styles.verticalSeparator} />

          <View style={styles.headerDetailsSection}>
            <Text style={[styles.baseText, styles.profileTitle]}>
              {MOCK_DATA.title}
            </Text>
            <Text style={[styles.baseText, styles.followersCount]}>
              {MOCK_DATA.followersCount} seguidores
            </Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyTabsContainer}>
            <IconTab
              iconProps={{
                iconName: 'search',
                color: 'white',
                size: 24,
              }}
              longPressLabel="Detalhes"
              onPress={() => onChangeCurrentTab('Details')}
            />
            <IconTab
              iconProps={{
                iconName: 'layers',
                color: 'white',
                size: 24,
              }}
              longPressLabel="Publicações"
              onPress={() => onChangeCurrentTab('Posts')}
            />
            <IconTab
              iconProps={{
                iconName: 'heart',
                color: 'white',
                size: 24,
              }}
              longPressLabel="Pets"
              onPress={() => onChangeCurrentTab('Pets')}
            />
          </View>

          <View style={styles.horizontalSeparatorContainer}>
            <View style={styles.horizontalSeparator} />
          </View>

          <View style={styles.activeProfileBodyContainer}>
            {currentTabToRender}
          </View>
        </View>
      </View>
    </View>
  );
}
