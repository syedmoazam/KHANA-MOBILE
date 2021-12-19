import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  Branches,
  FoodApply,
  RequestComplete
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'

const Stack = createStackNavigator()
// if (!firebase.apps.length) {
//   firebase.initializeApp(FIREBASE_CONFIG)
// }

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            name="Branches"
            component={Branches}
          />
          <Stack.Screen
            name="FoodApply"
            component={FoodApply}
          />
          <Stack.Screen
            name="RequestComplete"
            component={RequestComplete}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
