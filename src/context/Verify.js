import React from 'react';
import axios from 'axios';
import Alert from '../components/Alert'
import { VERIFY } from '../../types/link'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentContext } from './Students';
import { int_context } from '../interface/context_verify'

const VerifyContext = React.createContext();


const VerifyProvider = ({ children }) => {

    var token = React.useRef(null).current;
    const student = React.useContext(StudentContext)

    const runVerify = async () => {
        token = await AsyncStorage.getItem('token');
        
        const fetchData = async () => {
            var verify = false
            await axios.post(VERIFY, { token }).then((response) => {                                
                if (response.data.status === 'success') {
                    if (student) {
                        student.setData(response.data.value);
                        verify = true;
                    }
                }else if (response.data.status === 'expire'){
                    verify = false;
                    Alert('You were logged out, as you tried to login at other device, Login again')
                }
                 else {
                    Alert('Something Went Wrong, please try again later')
                }
            })
            return verify
        }
        if (token !== null) {
            var tike = await fetchData()
            return tike
        } else {
            return false
        }
    }

    return (
        <VerifyContext.Provider value={{ runVerify }}>
            {children}
        </VerifyContext.Provider>
    )
}

export { VerifyProvider, VerifyContext }