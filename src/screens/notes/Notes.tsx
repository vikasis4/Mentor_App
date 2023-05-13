import { StyleSheet, Text, FlatList, View } from 'react-native';
import React from 'react'
import { font } from '../../variables/files';
import axios from 'axios';
import { FETCH_NOTES } from '../../../types/link'
import { StudentContext } from '../../context/Students';
import Alert from '../../components/Alert'
import Msgs from './Msgs';

const Notes = (props: any) => {

    const student = React.useContext(StudentContext)
    const { name, studentId } = props.route.params;
    const [data, setData] = React.useState<any>(null)
    React.useEffect(() => {
        const getData = async () => {
            await axios.post(FETCH_NOTES, { Sid: studentId, Mid: student.mentorId }).then((response) => {
                console.log(response.data);
                if (response.data.status) {
                    setData(response.data.value)
                } else if (response.data.status === 'no') {
                    ///
                }
                else {
                    Alert("Something went wrong. Please try again")
                }
            })
        }
        getData()
    }, [])

    return (
        <>
            <Text style={styles.txt1}>{name}</Text>
            <View style={styles.inner}>
                {
                    data && (

                        <FlatList
                            data={data}
                            inverted
                            style={{width:'100%'}}
                            renderItem={(value: any) => <Msgs data={value} />}
                            keyExtractor={() => (Math.random() * 100000).toString()}
                        />
                    )
                }
            </View>
        </>
    )
}

export default Notes

const styles = StyleSheet.create({
    inner: {
        justifyContent: 'center',
        paddingVertical: 40,
        alignItems: 'center',
        gap: 20,
        width:'100%'
    },
    txt1: {
        flex: 0,
        fontFamily: font.f4,
        elevation: 4,
        textAlign: 'center',
        color: 'black',
        width: '100%',
        backgroundColor: 'white',
        fontSize: 20,
        paddingVertical: 10,
    }
})