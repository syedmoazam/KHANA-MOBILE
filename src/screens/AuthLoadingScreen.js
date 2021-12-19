import React from 'react'
import { ActivityIndicator } from 'react-native'
import Background from '../components/Background'
import { theme } from '../core/theme'
import { authState } from '../api/auth-api'

export default function AuthLoadingScreen({ navigation }) {
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is logged in
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Dashboard' }],
  //     })
  //   } else {
  //     // User is not logged in
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'StartScreen' }],
  //     })
  //   }
  // })
  const user = authState();
  if (user) {
    // User is logged in
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  } else {
    // User is not logged in
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  )
}
