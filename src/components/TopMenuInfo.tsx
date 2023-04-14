import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { font } from '../variables/files'
import { useNavigation } from '@react-navigation/native'

const TopMenuInfo = () => {

    const navigation = useNavigation<any>()

    return (
        <View style={styles.cont}>
            <Text style={styles.txt1}>Total Students :- 43</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                <Text style={styles.btn}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TopMenuInfo

const styles = StyleSheet.create({
    btn:{
        fontFamily:font.f3,
        backgroundColor:'orange',
        color:'white',
        borderRadius:4,
        paddingHorizontal:30,
        paddingVertical:5
    },
    cont: {
        marginBottom: 10,
        paddingVertical: 14,
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'white',
        flexDirection:'row'
    },
    txt1: {
        fontFamily: font.f3,
        color: 'black'
    }
})