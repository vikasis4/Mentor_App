import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import TopMenuInfo from '../../components/TopMenuInfo'
import { font } from '../../variables/files'
import { startTheCall, endTheCall } from '../../functions/webrtc';

const Pending = (props: any) => {


  return (
    <>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
      <TopMenuInfo />
      <View style={styles.main}>
        <View style={styles.cont}>
          <Text style={styles.txt}>Vikas siri</Text>
          {/* <TouchableOpacity onPress={() => props.navigation.navigate('Call')}> */}
          <TouchableOpacity onPress={() => startTheCall()}>
            <Text style={styles.btn}>Koll</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => endTheCall()}>
            <Text style={styles.btn}>end</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Pending

const styles = StyleSheet.create({
  btn: {
    color: 'white',
    fontFamily: font.f3,
    fontSize: 18,
    backgroundColor: 'black',
    paddingHorizontal: 30,
    borderRadius: 6
  },
  main: {
    alignItems: 'center'
  },
  cont: {
    height: 30,
    width: '90%',
    backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
    fontFamily: font.f3,
    fontSize: 18
  }
})