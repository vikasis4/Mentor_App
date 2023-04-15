import React from 'react';
import { data_sample, data, data2, int_context } from '../interface/context_student';


const StudentContext = React.createContext<int_context | null>(null);


const StudentProvider = ({ children }: any) => {
    
    const [state, setState] = React.useState(false)
    const [data, setData] = React.useState<data2 | null>(null)
    var pending = React.useRef<data[]>([data_sample]).current;
    var completed = React.useRef<data[]>([data_sample]).current;
    var newuser = React.useRef<data[]>([data_sample]).current;


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
        <StudentContext.Provider value={{ pending, completed, newuser, setData, state }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentProvider, StudentContext }