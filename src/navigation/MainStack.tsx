import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopNav from './TopNav';
import { StatusBar } from 'react-native';
import Profile from '../screens/Profile'

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{
                animation: 'slide_from_right',
                presentation: 'card',
            }}>
          <Stack.Screen name="Home" component={TopNav} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MainStack

