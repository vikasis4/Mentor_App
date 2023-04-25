import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopNav from './TopNav';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Call from '../screens/Call';
import StudentMenu from '../screens/StudentMenu';
import Chat from '../screens/chat/Chat';

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
          <Stack.Screen name="Call" component={Call} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="StudentMenu" component={StudentMenu} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MainStack

