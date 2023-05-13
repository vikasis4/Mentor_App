import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { font } from '../variables/files'
import { useNavigation } from '@react-navigation/native'
import { StudentContext } from '../context/Students'

const TopMenuInfo = (props: any) => {

    const navigation = useNavigation<any>();
    const student = React.useContext(StudentContext);
    const num = student.info.count;
    const [count, setCount] = React.useState()
    React.useEffect(() => {
        setCount(student.pending.length + student.news.length)
    }, [student])

    return (
        <View style={styles.main}>
            <View style={styles.cont}>
                <Text style={styles.txt1}>Total Students :- {num}</Text>
                <Text style={styles.txt1}>{props.data.name} Students :- {props.data.count}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.txt2}>{student.info.batch} / {count}</Text>
                <TouchableOpacity style={{ backgroundColor: 'white', alignItems: 'center' }} onPress={() => navigation.navigate('Profile')} >
                    <Text style={styles.btn}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopMenuInfo

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 12,
        backgroundColor: 'white',
    },
    btn: {
        fontFamily: font.f3,
        backgroundColor: 'orange',
        color: 'white',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 5,
        textAlign: 'center',
    },
    cont: {
        paddingVertical: 14,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    txt1: {
        fontFamily: font.f3,
        color: 'black'
    },
    txt2: {
        fontFamily: font.f3,
        color: 'green',
        borderBottomWidth: 1,
        borderColor: 'green'
    }
})