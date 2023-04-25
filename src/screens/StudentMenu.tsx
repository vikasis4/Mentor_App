import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { font } from '../variables/files'

const StudentMenu = (props:any) => {

    const { name, roomId, chatId, studntId, status } = props.route.params
    
  return (
    <>
      <Text style={styles.txt1}>{name}</Text>
      <Button title="Chat" onPress={() => props.navigation.navigate('Chat', props.route.params)} />
    </>
  )
}

export default StudentMenu

const styles = StyleSheet.create({
    txt1:{
        fontFamily:font.f4,
        elevation:4,
        textAlign: 'center',
        color: 'black',
        backgroundColor:'white',
        fontSize:20,
        paddingVertical:10
    }
})