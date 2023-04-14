import React from 'react';
import { font } from '../variables/files';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from '../screens/students/Pending';
import Done from '../screens/students/Done';
import New from '../screens/students/New';

const Tab = createMaterialTopTabNavigator();


const TopNavigation = () => {


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 14, fontFamily: font.f3 },
        tabBarStyle: {
          height: 50,
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen name="Pending" component={Pending} />
      <Tab.Screen name="Completed" component={Done} />
      <Tab.Screen name="New" component={New} />
    </Tab.Navigator>
  )
}

export default TopNavigation