import { StyleSheet, Text, View, Image, Button, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { font } from '../variables/files'
import { chat, done, notes, call } from '../variables/images'
import { StudentContext } from '../context/Students'
import axios from 'axios'
import { STATUS_UPDATE, SEND_NOTES } from '../../types/link'
import Alert from '../components/Alert'

const StudentMenu = (props: any) => {

  const student = React.useContext(StudentContext);
  const { name, roomId, chatId, studentId, status } = props.route.params;
  const [msg, setMsg] = React.useState<any>(null);

  ///////////////////////// UPDATE STATUS ////////////////////////////////
  const updateStatus = async (value: any) => {
    if (status !== 'completed') {
      await axios.post(STATUS_UPDATE, { mentorId: student.mentorId, studentId }).then((response) => {
        if (response.data.status) {
          var index = student.data.findIndex(({ studentId }: any) => studentId === value);
          student.data[index].status = 'completed';
          student.updateValue()
        } else {
          Alert("Something went wrong. Please try again")
        }
      }).catch((error) => {
        Alert("Something went wrong. Please try again")
        console.log(error);
      })
    }
  }

  ///////////////////////// SEND NOTES ////////////////////////////////
  const timeSpace = () => {
    var time = {
      mins: new Date().getMinutes(),
      hrs: new Date().getHours(),
      date: new Date().getDate(),
      month: new Date().getMonth(),
    }
    return time
  }
  const sendNotes = async () => {
    if (msg) {
      setMsg('')
      var { date, month, hrs, mins } = timeSpace();
      await axios.post(SEND_NOTES, { msg, date, month, hrs, mins, Sid:studentId, Mid: student.mentorId }).then((response) => {
        if (!response.data.status) {
          Alert("Something went wrong. Please try again")
        }
      })
    }
  }


  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, alignItems: 'center' }}>

        <Text style={styles.txt1}>{name}</Text>

        <View style={styles.two}>
          <View style={styles.cont}>
            <TouchableOpacity activeOpacity={0.2} onPress={() => props.navigation.navigate('Notes', props.route.params)} >
              <Image source={notes} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.2} onPress={() => updateStatus(studentId)} >
              <Image source={done} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.2} onPress={() => props.navigation.navigate('Chat', props.route.params)} >
              <Image source={chat} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.2} onPress={() => props.navigation.navigate('Call', props.route.params)} >
              <Image source={call} style={styles.img} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.three}>
          <TextInput value={msg} multiline={true} numberOfLines={14} onChangeText={(e) => setMsg(e)} style={styles.input} />
          <Button title="save" onPress={() => sendNotes()} />
        </View>

      </KeyboardAvoidingView>
    </>
  )
}

export default StudentMenu

const styles = StyleSheet.create({
  three: {
    width: '90%'
  },
  input: {
    height: 150,
    width: '100%',
    color: 'white',
    backgroundColor: 'black',
    marginTop: 30,/////,
    fontFamily: font.f4
  },
  cont: {
    marginTop: 40,/////
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 50,
    borderRadius: 8
  },
  two: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 40,
    width: 40
  },
  txt1: {
    fontFamily: font.f4,
    elevation: 4,
    textAlign: 'center',
    color: 'black',
    width: '100%',
    backgroundColor: 'white',
    fontSize: 20,
    paddingVertical: 10
  }
})