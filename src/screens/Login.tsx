import { StyleSheet, Text, View, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { login } from '../variables/images'
import { font } from '../variables/files'
import axios from 'axios'
import { LOGIN } from '@env'
import Alert from '../components/Alert'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VerifyContext } from '../context/Verify'
import { StudentContext } from '../context/Students'

const Login = (props: any) => {

    const [phone, setPhone] = React.useState('')
    const [pass, setPass] = React.useState('')
    const verify = React.useContext(VerifyContext)
    const student = React.useContext(StudentContext)
    const [load, setLoad] = React.useState(false)

    const handleSubmit = async () => {
        setLoad(true)
        axios.post(LOGIN, { phone, password: pass }).then(async (response) => {
            if (response.data.status === 'true') {
                await AsyncStorage.setItem('token', response.data.token);
                verify ? verify.runVerify() : null
            } else {
                Alert('Something went wrong, please try again later')
            }
        })
    }
    React.useEffect(() => {
        if (student) {
            if (student.state) {
                props.navigation.navigate('Home')
            }
        }
    }, [student])

    return (
        <>
            <View style={[styles.tint, load ? { zIndex: 10 } : { zIndex: -10 }]}>
                <Text style={styles.load}>Loading...</Text>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
                <Image style={styles.img} source={login} />
                <Text style={styles.text}>Login</Text>
                <View style={{ height: 50 }}></View>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setPhone(e)}
                    value={phone}
                    placeholder="Enter Your Phone Number"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setPass(e)}
                    value={pass}
                    placeholder="Enter Your Phone Number"
                    keyboardType="numeric"
                />
                <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={styles.btn}>
                    <Text style={styles.txt}>Login</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    tint: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    load: {
        fontFamily: font.f2,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 42
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'gray',
        width: '90%',
        borderRadius: 4,
    },
    txt: {
        fontFamily: font.f2,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 28
    },
    input: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 6,
        width: '90%',
        color: 'gray',
        fontFamily: font.f3,
        paddingHorizontal: 20,
        marginTop: 30
    },
    img: {
        height: 300,
        width: '100%'
    },
    text: {
        fontFamily: font.f3,
        color: 'black',
        textAlign: 'center',
        fontSize: 42,
        marginTop: 20
    },
})