import { StyleSheet, Text, View,Platform, StatusBar,KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native'
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

    const [phone, setPhone] = React.useState<any>(null)
    const [pass, setPass] = React.useState<any>(null)
    const verify = React.useContext(VerifyContext)
    const student = React.useContext(StudentContext)
    const [load, setLoad] = React.useState(false)

    async function handleSubmit(): Promise<void> {
        axios.post(LOGIN, { phone, password: pass }).then(async (response) => {
            if (response.data.status === 'true') {
                await AsyncStorage.setItem('token', response.data.token);
                if (verify) {
                    verify.runVerify()
                }
            }
            else if (response.data.status === 'true') {
                Alert('No User Found with this Phone number ')
            }
            else {
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
            {/* <View style={[styles.tint, load ? { zIndex: 10 } : { zIndex: -10 }]}>
                <Text style={styles.load}>Loading...</Text>
            </View> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex:1}}>

                <View style={styles.middle}>
                    <StatusBar animated={true} barStyle='dark-content' backgroundColor='white' />
                    <Image style={styles.img} source={login} />
                    <Text style={styles.text}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setPhone(e)}
                        value={phone}
                        placeholder='Enter Phone Number'
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Password'
                        onChangeText={(e) => setPass(e)}
                        value={pass}
                    />
                </View >
                <View style={styles.last}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={styles.btn}>
                        <Text style={styles.txt}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    middle: {
        backgroundColor: 'white',
        flex: 10,
        justifyContent: 'center',
        gap: 30,
        alignItems: 'center'
    },
    last: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    tint: {
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
        backgroundColor: '#3E75E1',
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
        position: 'relative',
        backgroundColor: 'black',
        width: '90%',
        color: 'white',
        fontFamily: font.f3,
        paddingHorizontal: 20,
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
    },
})