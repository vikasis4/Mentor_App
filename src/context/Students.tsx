import React from 'react';
import axios from 'axios';
import { data_sample, data, int_context } from '../interface/context_student';
import Alert from '../components/Alert'

const StudentContext = React.createContext<int_context | null>(null);


const StudentProvider = ({ children }: any) => {

    var link = ''
    var id = ''
    const [state, setState] = React.useState(false)
    const [data, setData] = React.useState(null)
    var pending = React.useRef<data[]>([data_sample]).current;
    var completed = React.useRef<data[]>([data_sample]).current;
    var newuser = React.useRef<data[]>([data_sample]).current;

    const fetchData = async () =>{
        axios.post(link, id).then((response) => {
            if (response.data.status === 'success') {
                setData(response.data.value)
            }else{
                Alert('Something Went Wrong, please try again later')
            }
        })
    }
    React.useEffect(() => {
        // fetchData()
    },[])
    React.useEffect(() => {
        if (data) {
            /// algo ///
            setState(true)
        }
    },[data])


    return (
        <StudentContext.Provider value={{ pending, completed, newuser, state, fetchData }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentProvider, StudentContext }