import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { font } from '../../variables/files'
import { useNavigation } from '@react-navigation/native';

const Map = (props: any) => {

    
    const { name } = props.data;
    const navigation = useNavigation<any>()


    return (
        <TouchableOpacity onPress={() => navigation.navigate('StudentMenu', props.data) } style={styles.cont}>
            <Text style={styles.txt}>{name}</Text>
        </TouchableOpacity>
    )
}

export default Map

const styles = StyleSheet.create({
    cont:{
        backgroundColor: 'white',
        borderRadius:4,
        width:'40%',
        justifyContent:'center',
        alignItems: 'center',
        height:100,
        elevation:6,
    },
    txt:{
        fontFamily: font.f3,
        color: 'black',
    }
})