import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { RTCPeerConnection,mediaDevices, RTCSessionDescription } from 'react-native-webrtc';
import { CHAT_SOCKET_URL } from '../../types/link'
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebRtcContext = React.createContext();

const WebRtcProvider = ({ children }) => {

    var socket = React.useMemo(() => { return io.connect(CHAT_SOCKET_URL) }, []);

    // const [socketId, setSocketId] = useState({ mentor: null, student: null });
    // const [conn, setConn] = useState('false');
    // let sessionConstraints = {
    //     mandatory: {
    //         OfferToReceiveAudio: true,
    //         OfferToReceiveVideo: false,
    //         VoiceActivityDetection: true
    //     }
    // };

    // var socket;
    // var socket = React.useMemo(() => { return io.connect(SOCKET) }, []);
    // var peer = React.useMemo(() => {
    //     return new RTCPeerConnection({
    //         iceServers: [
    //             {
    //                 urls: [
    //                     "stun:stun.l.google.com:19302",
    //                     "stun:global.stun.twilio.com:3478",
    //                 ],
    //             },
    //         ],
    //     })
    // }, []);

    // const init = async () => {
    //     const stream = await mediaDevices.getUserMedia({
    //         audio: true,
    //         video: true,
    //     });

    //     for (const track of stream.getTracks()) {
    //         peer.addTrack(track, stream);
    //     }
    // }
    // init()

    // const setId = async (data) => {
    //     setSocketId({ ...socketId, mentor: data })
    // }
    // useEffect(() => {
    //     socket.on('get_id', setId)
    //     return () => {
    //         socket.off('get_id', setId)
    //     }
    // }, [socket])

    //////////////////////////////////

    // const getAnswer = async (offer) => {
    //     if (peer) {

    //         const offerDescription = new RTCSessionDescription(offer);
    //         await peer.setRemoteDescription(offerDescription);

    //         const ans = await peer.createAnswer();
    //         await peer.setLocalDescription(ans);
    //         return ans;
    //     }
    // }

    // const setLocalDescription = async (ans) => {
    //     if (peer) {
    //         await peer.setRemoteDescription(new RTCSessionDescription(ans));
    //     }
    // }

    // const getOffer = async () => {
    //     if (peer) {
    //         const offer = await peer.createOffer(sessionConstraints);
    //         await peer.setLocalDescription(new RTCSessionDescription(offer));
    //         return offer;
    //     }
    // }

    // <WebRtcContext.Provider value={{ setSocketId, socketId, socket, peer, getAnswer, setLocalDescription, getOffer }}>
    return (
        <WebRtcContext.Provider value={{ socket }}>
            {children}
        </WebRtcContext.Provider>
    )
}

export { WebRtcProvider, WebRtcContext };