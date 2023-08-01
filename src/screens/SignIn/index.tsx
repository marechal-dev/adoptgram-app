import { useState } from "react"
import { View, ScrollView, Text } from "react-native"

import { styles } from "./styles"

import { SignInScreenProps } from "@Navigation/stack/types/screen-types"

import { Container } from "@Components/core/primitives/Container"
import { FormToggleButton } from "./components/FormToggleButton"
import { CommonUserForm } from "./forms/CommonUserForm"
import { OrgForm } from "./forms/OrganizationForm"

type CurrentForm = "CommonUser" | "ORG"

export function SignInScreen({ navigation }: SignInScreenProps) {
  const [currentForm, setCurrentForm] = useState<CurrentForm>("CommonUser")

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollContainer}
    >
      <Container.SafeArea style={styles.innerContainer}>
        <Text style={styles.headingText}>Cadastro</Text>

        <View style={styles.formToggleContainer}>
          <FormToggleButton
            icon="user"
            text="Não sou ONG"
            isSelected={currentForm === "CommonUser" ? true : false}
            onPressHandler={() => setCurrentForm("CommonUser")}
          />
          <FormToggleButton
            icon="heart"
            text="Sou ONG"
            isSelected={currentForm === "ORG" ? true : false}
            onPressHandler={() => setCurrentForm("ORG")}
          />
        </View>

        {currentForm === "CommonUser" ? <CommonUserForm /> : <OrgForm />}
      </Container.SafeArea>
    </ScrollView>
  )
}
