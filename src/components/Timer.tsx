import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { light, font } from '../variables/files'

const Timer = () => {

    const [seconds, setSeconds] = React.useState<number>(0);
    const [Mins, setMins] = React.useState<number>(0);
    const action = () => {
        setSeconds(0)
        setMins(Mins + 1)
    }
    React.useEffect(() => {
        var time = setTimeout(() => {
            seconds === 59 ? action() : setSeconds(seconds + 1)
        }, 1000)
        return () => clearTimeout(time)
    })

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.txt, { width: 70 }]}>{Mins.toString().length === 1 ? '0' + Mins : Mins}:{seconds.toString().length === 1 ? '0' + seconds : seconds}</Text>
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