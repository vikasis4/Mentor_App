import React from 'react';
/////////////////// INTERFACE ///////////////////////////
interface int_context {
    
}
/////////////////// INTERFACE ///////////////////////////
const StudentContext = React.createContext<int_context | null>(null);


const StudentProvider = ({ children }: any) => {


    return (
        <StudentContext.Provider value={{  }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentProvider, StudentContext }