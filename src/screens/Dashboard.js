import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'

export default function Dashboard({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Welcome</Header>
      <Paragraph>
        Apply for food Help
      </Paragraph>
      <Button mode="outlined" onPress={()=>navigation.navigate("Branches")}>
        Apply
      </Button>
      <Button mode="outlined" onPress={()=>{
        logoutUser();
        navigation.replace("StartScreen")
      }}>
        Logout
      </Button>
    </Background>
  )
}
