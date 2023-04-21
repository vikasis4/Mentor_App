import { io } from "socket.io-client";
import axios from 'axios';
import { FCM, SOCKET } from '../../types/link';
import Alert from '../components/Alert';

var toks = 'cRk6Th18Q6GU3FV4xS-J2e:APA91bEWALbC7YgUi75lsHhQQ5DI-F5qP7Ub2z3wOTzDp0dfiJjPk4oAV1l-6kGJOJmMUD3-tcbwBt9sQru-Z0iZsPvalVU_3j_stXhmIaBQic5vXSahzGAv2E9hV1F3TXmwq6rR_sR5'
var endTheCall = () => { };

var socket = false;

const startTheCall = async () => {
    var my_socket_id;
    var remote_socket_id;
    if (socket === false) {
        socket = await io.connect(SOCKET);
    } else {
        send_fcm()
    }
    ////////////////////////////////////////////////////////
    const fcm_notify = async (data) => {
        my_socket_id = data;
        send_fcm()
    }
    const send_fcm = async () => {
        await axios.post(FCM, {
            socket_id: my_socket_id,
            token: toks
        }).then((response) => {
            if (!response.data.status) {
                Alert('Something went wrong, please try again later')
            }
        }).catch((error) => {
            console.log(error);
            Alert('Something went wrong, please try again later')
        })
    }
    const remote_id = (data) => {
        remote_socket_id = data;
        socket.emit('confirmation', { to: remote_socket_id, from: my_socket_id, status:true })
    }
    socket.on('get_id', fcm_notify)
    socket.on('student_socket_id', remote_id)
    
  ///////////////////////////// WEBRTC FLOW //////////////////////////////////



    ////////////////////////////////////////////////////////////////
    endTheCall = async () => {
        remote_socket_id = ''
        // socket.disconnect();
        // socket.close();
    }
}

export { startTheCall, endTheCall }