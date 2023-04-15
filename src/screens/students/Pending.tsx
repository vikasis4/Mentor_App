import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'

const Pending = () => {
  return (
    <View>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
      <TopMenuInfo />
      <Text style={{ color: 'red' }}>Pending</Text>
    </View>
  )
}

export default Pending

const styles = StyleSheet.create({})