import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { font } from '../../variables/files'
import Msgs from './Msgs'
import { send } from '../../variables/images'
import { WebRtcContext } from '../../context/WebRtc'
import axios from 'axios'
import { CHAT_API_FETCH, CHAT_POST_API } from '../../../types/link'
import Alert from '../../components/Alert'

const Chat = (props: any) => {

    const { name, roomId, chatId, studentId, status } = props.route.params;

    const [data, setData] = useState<any>([]);
    const [msg, setMsg] = useState('');
    const webrtc = React.useContext(WebRtcContext);
    const socket = webrtc.socket
    const [list, setList] = useState<any>([]);
    const [newmsg, setNewmsg] = useState<any>(null);
    const scrollViewRef = React.useRef<any>();

    ////////////////////////COMMAN SPACE///////////////////////////////////////
    const mapFunction = (value: any) => {
        return <Msgs fxn={fxn} key={(Math.random() * 100000).toString()} datas={value} />
    }
    const timeSpace = () => {
        var time = {
            mins: new Date().getMinutes(),
            hrs: new Date().getHours(),
            date: new Date().getDate(),
            month: new Date().getMonth(),
        }
        return time
    }
    ///////////////////////////SOCKET////////////////////////////////////
    useEffect(() => {
        socket.emit('join_room', { room: roomId })
    }, [])
    useEffect(() => {
        if (newmsg) { setList([...list, mapFunction(newmsg)]) }
    }, [newmsg])
    const handlenotification = ({ message }: any) => {
        data.push(message)
        setNewmsg(message)
    }
    useEffect(() => {
        socket.on('newMsg', handlenotification)
        return () => {
            socket.off('newMsg', handlenotification)
        }
    }, [socket])

    const [one, setOne] = useState(true)
    ///////////////////////////////////////////////////////////////
    useEffect(() => {
        if (one) {
            if (data.length === 0) {
                const pullData = async () => {
                    await axios.post(CHAT_API_FETCH, { id: studentId }).then((response: any) => {
                        if (response.data.status) {
                            setData(response.data.messages)
                        } else {
                            Alert('Something went wrong')
                        }
                    }).catch((error) => {
                        console.log(error);
                        Alert('Something went wrong')
                    })
                }
                pullData()
            } else {
                if (list.length === 0 && data.length > 80) {
                    setOne(false)
                    var start = data.length - 80;
                    var end = data.length
                    var label = { type: 'load', txt: '' };
                    setList([mapFunction(label), ...(data.slice(start, end)).map((data: any) => { return mapFunction(data) })]);
                } else {
                    setOne(false)
                    setList(data.map((data: any) => { return mapFunction(data) }))
                }
            }
        }
    }, [data]);
    ///////////////////////////////////////////////////////////////

    const submit = async () => {
        if (msg.length !== 0) {
            setMsg('')
            var { date, month, hrs, mins } = timeSpace();
            var datas = { type: 'mentor', txt: msg, mins, hrs, date, month }
            data.push(datas)
            setList([...list, mapFunction(datas)]);
            socket.emit('newMsg', { message: datas, room: roomId });
            await axios.post(CHAT_POST_API, { message: datas, id: studentId }).then((res) => {
                if (!res.data.status) {
                    Alert('Something went wrong')
                }
            })
        }
    }

    const fxn = () => {
        setList(data.map((data: any) => { return mapFunction(data) }))
    }

    return (
        <>
            <Text style={styles.txt}>{name}</Text>

            <View style={[styles.scroll]}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {
                        list
                    }
                </ScrollView>
            </View>

            <View style={styles.last}>
                <View style={styles.bottom}>
                    <TextInput style={[styles.input]} value={msg} onChangeText={(e) => { setMsg(e) }} placeholder="Enter Text" />
                    <TouchableOpacity onPress={submit}>
                        <Image style={styles.img2} source={send} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Chat

const styles = StyleSheet.create({
    last: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    txt: {
        flex: 1,
        fontFamily: font.f4,
        elevation: 4,
        textAlign: 'center',
        color: 'black',
        backgroundColor: 'white',
        fontSize: 20,
        paddingVertical: 10
    },
    scroll: {
        flex: 18,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    bottom: {
        width: '94%',
        borderRadius: 100,
        flexDirection: 'row',
        elevation: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        fontFamily: font.f4,
        width: '78%',
        color: 'black'
    },
    img2: {
        height: 32,
        width: 32,
    }
})