import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react'
import { accent, font } from "../../variables/files";

const Msgs = (props: any) => {
  
  const { txt, type } = props.datas;

  const [show, setShow] = React.useState(true)
  const loadMore = () => {
    setShow(false)
    props.fxn()
  }


  if (type === 'load') {
    return (
      <>
        <View style={[styles.cont_label]} >
          <TouchableOpacity activeOpacity={0.8} onPress={loadMore}>
            <Text style={[styles.txt_label]}>{show ? 'Load All Chats' : 'Loading... Please wait'}</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  } else {
    return (
      <>
        <View style={[styles.cont, { alignItems: type === 'mentor' ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.txt, type === 'mentor' ? {borderBottomLeftRadius : 10 } : {borderBottomRightRadius : 10 }, { backgroundColor: type === 'mentor' ? accent : 'white', color: type === 'mentor' ? 'white' : 'black' }]}>{txt}</Text>
        </View>
      </>
    )
  }
}

export default memo(Msgs)

const styles = StyleSheet.create({
  txt_label: {
    backgroundColor: 'black',
    fontFamily: font.f3,
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 50,
    elevation: 10
  },
  cont_label: {
    alignItems: 'center',
  },
  cont: {
    width: '100%',
  },
  txt: {
    fontFamily: font.f4,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 20,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})