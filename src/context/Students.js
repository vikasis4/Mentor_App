import React from 'react';

const StudentContext = React.createContext();


const StudentProvider = ({ children }) => {

    const [state, setState] = React.useState(false)
    const [data, setData] = React.useState([])
    const [pending, setPending] = React.useState();
    const [completed, setCompleted] = React.useState();
    const [news, setNews] = React.useState();
    const [mentorId, setMentorId] = React.useState('');

    var val = (new Date().getDay()) % 2 === 0 ? 0 : 1;
    var fxn = (value) => { return value % 2 === 0 ? 0 : 1 };
    ////////////
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var info = {
        batch: val === 0 ? `Batch 1 / ${weekday[(new Date().getDay())]}` : `Batch 2 / ${weekday[(new Date().getDay())]}`,
        count: data.length
    };
    ////////////

    const updateValue = () => {
        setNews(data.filter((element, index) => (element.status === 'new' && fxn(index) === val)))
        setPending(data.filter((element, index) => (element.status === 'pending' && fxn(index) === val)))
        setCompleted(data.filter((element, index) => (element.status === 'completed' && fxn(index) === val)))
        setState(true);
    }
    React.useEffect(() => {
        if (data.length > 0) {
            info.count = data.length;
            setState(false);
            updateValue()
        }
    }, [data])


    return (
        <StudentContext.Provider value={{setMentorId, mentorId, pending, news, completed, data, setData, state, info, updateValue }}>
            {children}
        </StudentContext.Provider>
    )
}

export { StudentProvider, StudentContext }