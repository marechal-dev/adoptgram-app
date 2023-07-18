import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native"

import { styles } from "./style"
import { BrandButton } from "../../components/core/brand/BrandButton/BrandButton"
import { OnboardingScreenProps } from "../../types/screens-types"
import { Container } from "../../components/core/primitives/Container"

import heroGif from "../../../assets/images/sammy-delivery.gif"

export function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const { width, height } = useWindowDimensions()

  let paddingTopValue = 82
  let paddingHorizontalValue = 36
  let marginBetweenOnboardingInformationAndButton = 144
  let onboardingTextBoxSize = 160

  if (height > 800) {
    paddingTopValue = 62
  }

  if (height > 600 && height < 800) {
    marginBetweenOnboardingInformationAndButton = 124
  }

  if (width < 400) {
    paddingHorizontalValue = 26
  }

  if (width > 400) {
    onboardingTextBoxSize = 180
  }

  const responsiveOuterContainerPadding = StyleSheet.create({
    responsivePadding: {
      paddingTop: paddingTopValue,
      paddingHorizontal: paddingHorizontalValue,
    },
  })

  const responsiveMarginBetweenOnboardingInformationAndButton =
    StyleSheet.create({
      responsiveMargin: {
        marginBottom: marginBetweenOnboardingInformationAndButton,
      },
    })

  const responsiveOnboardingTextBoxWidth = StyleSheet.create({
    responsiveWidth: {
      maxWidth: onboardingTextBoxSize,
    },
  })

  return (
    <Container.SafeArea
      style={[
        styles.outerContainer,
        responsiveOuterContainerPadding.responsivePadding,
      ]}
    >
      <View
        style={[
          styles.innerOnboardingInformationContainer,
          responsiveMarginBetweenOnboardingInformationAndButton.responsiveMargin,
        ]}
      >
        <Image source={heroGif} style={styles.onboardingImage} />
        <Text
          style={[
            styles.onboardingText,
            responsiveOnboardingTextBoxWidth.responsiveWidth,
          ]}
        >
          Encontre seu novo melhor amigo no{" "}
          <Text style={styles.onboardingTextSpan}>AdoptGram!</Text>
        </Text>
      </View>

      <BrandButton onPressHandler={() => navigation.navigate("Login")}>
        Quero saber mais!
      </BrandButton>
    </Container.SafeArea>
  )
}
