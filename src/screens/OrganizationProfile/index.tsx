import { Image } from 'expo-image';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import PLACEHOLDER from '@Assets/images/placeholder-profile-picture.jpg';
import { IconTab } from '@Components/ui/IconTab';
import { LoadingOverlay } from '@Components/ui/LoadingOverlay';
import { IOrganizationProfile } from '@Models/organization-profile';
import { OrganizationProfileScreenProps } from '@Navigation/DetailsStack/types';
import { OrganizationService } from '@Services/organization-service';

import { ProfileDetails } from './components/ProfileDetails';
import { ProfilePets } from './components/ProfilePets';
import { ProfilePosts } from './components/ProfilePosts';
import { styles } from './styles';

type Tab = 'Details' | 'Posts' | 'Pets';

export function OrganizationProfileScreen({
  navigation,
  route,
}: OrganizationProfileScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<IOrganizationProfile>(
    {} as IOrganizationProfile,
  );
  const [currentTab, setCurrentTab] = useState<Tab>('Details');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Perfil: ONG ${route.params.username}`,
    });
  }, [navigation, route]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        const result = await OrganizationService.fetchProfileByUsername(
          route.params.username,
        );

        console.log(result);

        if (result.status === 200) {
          setProfile(result.data.details);
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar dados do perfil.');

        navigation.goBack();
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  function onChangeCurrentTab(tab: Tab) {
    setCurrentTab(tab);
  }

  const detailsTab = useMemo(
    () => (
      <ProfileDetails
        representativeName={profile.representativeName}
        cnpj={profile.cnpj}
        whatsapp={profile.whatsapp}
        bio={profile.bio}
        pixKey={profile.pixKey}
        telephone={profile.telephone}
      />
    ),
    [
      profile.bio,
      profile.cnpj,
      profile.pixKey,
      profile.representativeName,
      profile.telephone,
      profile.whatsapp,
    ],
  );

  const postsTab = useMemo(
    () => <ProfilePosts posts={profile.posts} />,
    [profile.posts],
  );

  const petsTab = useMemo(
    () => (
      <ProfilePets pets={profile.availablePets} whatsapp={profile.whatsapp} />
    ),
    [profile.availablePets, profile.whatsapp],
  );

  let currentTabToRender = detailsTab;

  if (currentTab === 'Posts') {
    currentTabToRender = postsTab;
  }

  if (currentTab === 'Pets') {
    currentTabToRender = petsTab;
  }

  return isLoading ? (
    <LoadingOverlay message="Carregando perfil..." />
  ) : (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={profile.profilePictureUrl || PLACEHOLDER}
            style={styles.profilePicture}
          />

          <View style={styles.verticalSeparator} />

          <View style={styles.headerDetailsSection}>
            <Text style={[styles.baseText, styles.profileTitle]}>
              {profile.title}
            </Text>
            <Text style={[styles.baseText, styles.followersCount]}>
              {profile.followersCount} seguidores
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
