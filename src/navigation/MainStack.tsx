import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopNav from './TopNav';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{
                animation: 'slide_from_right',
                presentation: 'card',
            }}>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TopNav} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MainStack

