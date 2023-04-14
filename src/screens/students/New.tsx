import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'

const New = () => {
  return (
    <View>
       <TopMenuInfo />
      <Text style={{color:'red'}}>New</Text>
    </View>
  )
}

export default New

const styles = StyleSheet.create({})