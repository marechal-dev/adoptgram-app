import { useState } from "react"
import { Text, View } from "react-native"

import { styles } from "./style"

import { Container } from "../../core/components/Container"
import { FormToggleButton } from "./components/FormToggleButton"
import { CommonUserForm } from "./forms/CommonUserForm"
import { OrgForm } from "./forms/OrgForm"

type CurrentForm = "CommonUser" | "ORG"

export function RegisterNewAccountScreen() {
  const [currentForm, setCurrentForm] = useState<CurrentForm>("CommonUser")

  return (
    <Container innerContainerStyleOverride={styles.innerContainer}>
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
    </Container>
  )
}
