import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { font } from '../variables/files'
import { useNavigation } from '@react-navigation/native'
import Timer from './Timer'

const TopMenuInfo = () => {

    const navigation = useNavigation<any>()

    return (
        <>
            <View style={styles.cont}>
                <Text style={styles.txt1}>Total Students :- 43</Text>
                <Timer />
            </View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'white', alignItems:'center'}} onPress={() => navigation.navigate('Profile')} >
                <Text style={styles.btn}>Profile</Text>
            </TouchableOpacity>
        </>
    )
}

export default TopMenuInfo

const styles = StyleSheet.create({
    btn: {
        fontFamily: font.f3,
        backgroundColor: 'orange',
        color: 'white',
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '70%',
        textAlign:'center',
        marginBottom:20
    },
    cont: {
        paddingVertical: 14,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    txt1: {
        fontFamily: font.f3,
        color: 'black'
    }
})