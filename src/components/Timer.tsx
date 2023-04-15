import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { light, font } from '../variables/files'

const Timer = () => {

    var date = new Date();
    var hrs = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();

    const [seconds, setSeconds] = React.useState<number>(60 - secs);
    const [Mins, setMins] = React.useState<number>(60 - mins);
    const [Hrs, setHrs] = React.useState<number>(hrs === 24 ? 24: 23 - hrs);
    const action = () => {
        if (mins === 0) {
            setMins(59)
            setHrs(Hrs-1)
        } else {
            setMins(Mins - 1)
        }
        if (hrs === 0) {
            setHrs(23)
        }
        setSeconds(60)
    }
    React.useEffect(() => {
        var time = setTimeout(() => {
            seconds === 0 ? action() : setSeconds(seconds - 1)
        }, 1000)
        return () => clearTimeout(time)
    })

    return (
        <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.txt}>Time Left : </Text>
            <Text style={[styles.txt, {width:70}]}>{Hrs}:{Mins}:{seconds}</Text>
        </View>
    )
}

export default Timer

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        marginTop: 8,
        color: 'black',
        fontFamily: font.f3
    }
})