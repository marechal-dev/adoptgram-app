import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { PressableIcon } from '@Components/ui/PressableIcon';
import { colors } from '@Theme/colors';

import { profileDetailsStyles } from './styles';

type ProfileDetailsProps = {
  representativeName: string;
  cnpj: string;
  bio?: string | null;
  whatsapp: string;
  telephone?: string | null;
  pixKey?: string | null;
};

export function ProfileDetails({
  representativeName,
  cnpj,
  bio,
  whatsapp,
  telephone,
  pixKey,
}: ProfileDetailsProps) {
  async function onPressCopyToClipboard() {
    if (!pixKey) {
      return;
    }

    await Clipboard.setStringAsync(pixKey);
  }

  return (
    <ScrollView style={profileDetailsStyles.contentContainer}>
      <Text
        style={[
          profileDetailsStyles.baseText,
          profileDetailsStyles.heading,
          profileDetailsStyles.mainTitle,
          profileDetailsStyles.centerText,
        ]}
      >
        Detalhes da ONG
      </Text>

      <View style={profileDetailsStyles.contentContainer}>
        <View>
          <Text
            style={[
              profileDetailsStyles.baseText,
              profileDetailsStyles.heading,
              profileDetailsStyles.subHeading,
            ]}
          >
            Detalhes Gerais
          </Text>

          <Text style={[profileDetailsStyles.baseText]}>
            Representante: {representativeName}
          </Text>
          <Text style={[profileDetailsStyles.baseText]}>CNPJ: {cnpj}</Text>
        </View>

        <View>
          <Text
            style={[
              profileDetailsStyles.baseText,
              profileDetailsStyles.heading,
              profileDetailsStyles.subHeading,
            ]}
          >
            Bio
          </Text>
          <Text
            style={[profileDetailsStyles.baseText, profileDetailsStyles.bio]}
          >
            {!bio ? 'Esse usuário não tem bio.' : bio}
          </Text>
        </View>

        <View>
          <Text style={[profileDetailsStyles.baseText]}>
            WhatsApp: {whatsapp}
          </Text>
          <Text style={[profileDetailsStyles.baseText]}>
            Telefone Residencial: {!telephone ? '-' : telephone}
          </Text>
          <View style={profileDetailsStyles.pixContainer}>
            <Text style={[profileDetailsStyles.baseText]}>
              Chave PIX: {!pixKey ? '-' : pixKey}
            </Text>
            {!pixKey ? null : (
              <PressableIcon
                iconProps={{
                  iconName: 'clipboard',
                  color: colors.brand.blue800,
                  size: 20,
                }}
                onPress={onPressCopyToClipboard}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
