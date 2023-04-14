import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'

const Pending = () => {
  return (
    <View>
       <TopMenuInfo />
      <Text style={{color:'red'}}>Pending</Text>
    </View>
  )
}

export default Pending

const styles = StyleSheet.create({})