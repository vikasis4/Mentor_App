import { io } from "socket.io-client";
import axios from 'axios';
import { FCM, SOCKET } from '../../types/link';
import Alert from '../components/Alert';
import {
    RTCPeerConnection,
    RTCSessionDescription,
    RTCView, mediaDevices
} from 'react-native-webrtc';

var toks = 'cRk6Th18Q6GU3FV4xS-J2e:APA91bEWALbC7YgUi75lsHhQQ5DI-F5qP7Ub2z3wOTzDp0dfiJjPk4oAV1l-6kGJOJmMUD3-tcbwBt9sQru-Z0iZsPvalVU_3j_stXhmIaBQic5vXSahzGAv2E9hV1F3TXmwq6rR_sR5'
var endTheCall = () => { };
var socket = false;
var my_socket_id;
var remote_socket_id;
var peer = false;
var my_stream = false;
var remote_stream = false;


const startTheCall = async (koks) => {

    await axios.post(FCM, {
                socket_id: koks,
                token: toks 
            }).then((response) => {
                if (!response.data.status) {
                    Alert('Something went wrong, please try again later')
                }
            }).catch((error) => {
                console.log(error);
                Alert('Something went wrong, please try again later')
            })

    if (socket === false) {
        socket = await io.connect(SOCKET);
    } else {
        send_fcm()
    }
    if (peer === false) {
        peer = await new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        });
    }

    console.log('89300');

    const getAnswer = async (offer) => {
        if (peer) {
            await peer.setRemoteDescription(offer);
            const ans = await peer.createAnswer();
            await peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    const setLocalDescription = async (ans) => {
        if (peer) {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }

    const getOffer = async () => {
        if (peer) {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }

    const sendStreams = () => {
        for (const track of my_stream.getTracks()) {
            peer.addTrack(track, my_stream);
        }
    }

    const handleOffer = async ({ from, offer }) => {
        remote_socket_id = from;
        const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        my_stream = stream;
        const ans = await getAnswer(offer);
        socket.emit("offer-accepted", { to: from, ans });
        sendStreams()
    }


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
        socket.emit('confirmation', { to: remote_socket_id, from: my_socket_id, status: true })
    }

    /////////////////////NEGO/////////////////////
    const handleNegoNeeded = async () => {
        const offer = await getOffer();
        socket.emit("peer:nego:needed", { offer, to: remote_socket_id });
    }
    const handleNegoNeedIncomming = async ({ from, offer }) => {
        const ans = await getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }

    const handleNegoNeedFinal = async ({ ans }) => {
        await setLocalDescription(ans);
    }

    socket.on('get_id', fcm_notify)
    socket.on('student_socket_id', remote_id)
    socket.on('student-offer', handleOffer)
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    peer.addEventListener("negotiationneeded", handleNegoNeeded);
    peer.addEventListener("track", async (ev) => {
        const remoteStream = ev.streams;
        remote_stream = remoteStream[0];
    });
    //////////////////////////////////////////////////////////////
    endTheCall = async () => {
        remote_socket_id = null
        socket.disconnect();
        socket.close();
        socket = false
        peer.close();
        peer = false;

        my_stream.getTracks().forEach(
            track => track.stop()
        );
        
        my_stream = null;
    }

    return (
        <RTCView
            mirror={true}
            objectFit={'cover'}
            streamURL={remote_stream.toURL()}
        />
    )

}

export { startTheCall, endTheCall }