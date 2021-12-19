import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { logoutUser } from '../api/auth-api'

export default function RequestComplete({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Your Request is submitted</Header>
      <Button mode="outlined" onPress={()=>navigation.navigate("Dashboard")}>
        Go to Dashboard
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
