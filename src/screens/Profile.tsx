import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { font } from '../variables/files'

const Homes = () => {
  return (
    <View style={{backgroundColor: 'white', flex:1}}>
      <Text style={{fontFamily:font.f2, textAlign: 'center',color:'black', fontSize:42, marginTop:42}}>Profile</Text>
    </View>
  )
}

export default Homes

const styles = StyleSheet.create({})