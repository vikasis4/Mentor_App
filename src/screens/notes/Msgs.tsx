import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react'
import { accent, font } from "../../variables/files";

const Msgs = (props: any) => {

  const { txt, mins, hrs, date, month } = props.data.item;
  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  return (
    <>
      <View style={styles.cont}>
        <Text style={styles.txt1}>{hrs}:{mins}, {date}{mS[month]}</Text>
        <Text style={styles.txt}>{txt}</Text>
      </View>
    </>
  )

}

export default memo(Msgs)

const styles = StyleSheet.create({
  cont: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
    alignItems: 'center'
  },
  txt: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: accent,
    fontFamily: font.f4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
    width: '90%'
  },
  txt1: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: '90%',
    paddingTop: 10,
    fontFamily: font.f3,
    color: 'gold',
    fontSize: 10,
    backgroundColor: accent,
    paddingBottom: 6,
    textAlign: 'center',
  },
})