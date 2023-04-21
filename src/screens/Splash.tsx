import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { font } from '../variables/files'
import { VerifyContext } from '../context/Verify'
import { StudentContext } from '../context/Students'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props: any) => {

    const verify = React.useContext(VerifyContext);
    const student = React.useContext(StudentContext);
    const [timera, setTimera] = React.useState(false)
    const [timerb, setTimerb] = React.useState(false)
    const [timerc, setTimerc] = React.useState(false)
    const [timerd, setTimerd] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setTimera(true)
        }, 2000);
        const execute = async () => {
            // await AsyncStorage.removeItem('token');
            if (verify) {
                if (await verify.runVerify()) {
                    setTimerb(true)
                } else {
                    setTimerd(true)
                }
            }
        }
        execute()
    }, [])
    React.useEffect(() => {
        if (student) {
            if (student.state) {
                setTimerc(true)
            }
        }
    }, [student])

    React.useEffect(() => {
        if (timera && timerb && timerc) {
            props.navigation.replace('Home')
        }
        if (timerd && timera) {
            props.navigation.replace('Login')
        }
    })

    return (
        <>
            <StatusBar animated={true} barStyle='dark-content' backgroundColor='black' />
            <View style={styles.cont}>
                <Text style={styles.txt}>RankBoost</Text>
                <Text style={styles.txt2}>Please Wait...</Text>
            </View>
        </>
    )
}

export default Splash

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 20
    },
    txt: {
        fontFamily: font.f2,
        fontSize: 48,
        color: 'white'
    },
    txt2: {
        fontFamily: font.f3,
        fontSize: 18,
        color: 'white'
    }
})