import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'

const Done = () => {
  return (
    <View>
      <TopMenuInfo />
      <Text style={{color:'red'}}>Done</Text>
    </View>
  )
}

export default Done

const styles = StyleSheet.create({})