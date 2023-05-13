import React, { useContext } from 'react';

const TimerContext = React.createContext();

const TimerProvider = ({ children }) => {

    const [seconds, setSeconds] = React.useState(0);
    const [Mins, setMins] = React.useState(0);;
    const [status, setStatus] = React.useState(false)
    const action = () => {
        setSeconds(0)
        setMins(Mins + 1)
    }
    React.useEffect(() => {
        if (status) {
            var time = setTimeout(() => {
                seconds === 59 ? action() : setSeconds(seconds + 1)
            }, 1000)
            return () => clearTimeout(time)
        }
    })

    return (
        <TimerContext.Provider value={{ seconds, Mins, setStatus }}>
            {children}
        </TimerContext.Provider>
    )
}

export { TimerContext, TimerProvider }