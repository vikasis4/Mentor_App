import React from 'react';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    MediaStream,
    mediaDevices,
} from 'react-native-webrtc';
import { io } from "socket.io-client";
import { CHAT_SOCKET_URL, CALL_SOCKET_URL } from '../../types/link'

const WebRtcContext = React.createContext();

const WebRtcProvider = ({ children }) => {

    var socket = React.useMemo(() => { return io.connect(CHAT_SOCKET_URL) }, []);


    let mediaConstraints = {
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            googEchoCancellation: true,
            googAutoGainControl: true,
            googNoiseSuppression: true,
            googHighpassFilter: true,
            googTypingNoiseDetection: true,
            googNoiseReduction: true
        },
        video: false
    };
    let peerConstraints = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ],
        iceTransportPolicy: 'all',
        rtcpMuxPolicy: 'require',
        bundlePolicy: 'balanced',
        sdpSemantics: 'unified-plan',
    };
    let sessionConstraints = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: false,
        }
    };

    const [localMediaStream, setLocalMediaStream] = React.useState();
    const [statuss, setStatus] = React.useState('Pending');
    const [connectionClosed, setConnectionClosed] = React.useState(false)
    const remoteMediaStream = React.useRef(new MediaStream()).current;
    let peerConnection = React.useRef();
    let socketId = React.useRef(null).current;
    let socket_W = React.useMemo(() => { return io.connect('http://192.168.101.76:8000') }, []);

    ///////////////////////////// SOCKET FXNS ///////////////////////////////
    const [myId, setMyId] = React.useState(null)
    const [remoteId, setRemoteId] = React.useState(null)

    React.useEffect(() => {
        if (socket_W) {
            socket_W.on('close', () => { setConnectionClosed(true) })
            socket_W.on('yourID', (data) => { setMyId(data) })
            socket_W.on('remoteId', (data) => { socketId = data.myId; setRemoteId(data) })
            socket_W.on('offer', (data) => { createAnswer({ offerDescription: data }) })
            socket_W.on('answer', (data) => { setRemoteDescription(data) })
            socket_W.on('iceCandidate', (data) => {console.warn("ICEEE :", data); peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate)) })

            return () => {
                socket_W.off('close', () => { setConnectionClosed(true) })
                socket_W.off('yourID', (data) => { setMyId(data) })
                socket_W.off('remoteId', (data) => { socketId = data.myId; setRemoteId(data.myId) })
                socket_W.off('offer', (data) => { createAnswer({ offerDescription: data }) })
                socket_W.off('answer', (data) => { setRemoteDescription(data) })
                socket_W.off('iceCandidate', (data) => { peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate)) })
            }
        }
    }, [])

    /////////////////////////////////////////// PEER FXNS //////////////////////////
    const iceconnectionstatechange = async (event) => {
        if (peerConnection.current) {
            if (peerConnection.current.iceConnectionState === 'checking') {
                setStatus('checking')
            }
            if (peerConnection.current.iceConnectionState === 'completed' || peerConnection.current.iceConnectionState === 'connected') {
                setStatus('connected')
            }
        }
    }
    const icecandidate = async (event) => {
        if (!event.candidate) {
            console.log('Gathering finished');
        } else {
            socket_W.emit('iceCandidate', { to: remoteId, candidate: event.candidate })
        }
    }
    const track = async (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteMediaStream.addTrack(track);
        });
    }
    /////////////////////////////////////////// PEER FXNS //////////////////////////

    const captureMedia = async () => {
        try {

            peerConnection.current = new RTCPeerConnection(peerConstraints);

            const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
            setLocalMediaStream(mediaStream);


            if (peerConnection.current) {

                peerConnection.current.addEventListener('iceconnectionstatechange', iceconnectionstatechange);
                peerConnection.current.addEventListener('icecandidate', icecandidate);
                peerConnection.current.addEventListener('track', track);

                mediaStream.getTracks().forEach(
                    (track) => { peerConnection.current.addTrack(track, mediaStream) }
                );

            }
        } catch (err) {
            console.error('EroR Hogiya', err);
        };
    }

    const createOffer = async () => {
        try {
            const offerDescription = await peerConnection.current.createOffer(sessionConstraints);
            await peerConnection.current.setLocalDescription(offerDescription);
            socket_W.emit('offer', { to: remoteId, offer: offerDescription })

        } catch (err) {
            console.error('EroR Hogiya2', err)
        };
    }
    const createAnswer = async ({ offerDescription }) => {
        try {
            const offerDescriptions = new RTCSessionDescription(offerDescription);
            await peerConnection.current.setRemoteDescription(offerDescriptions);

            const answerDescription = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answerDescription);

            socket_W.emit('answer', { to: socketId, answer: answerDescription })

        } catch (err) {
            console.error('EroR Hogiya3', err)
        }
    };

    const setRemoteDescription = async (answerDescription) => {
        try {
            const answerDescriptions = new RTCSessionDescription(answerDescription);
            await peerConnection.current.setRemoteDescription(answerDescriptions);
        } catch (err) {
            console.error('EroR Hogiya4', err)
        };
    }

    const closeCall = async () => {
        peerConnection.current.removeEventListener('iceconnectionstatechange', iceconnectionstatechange);
        peerConnection.current.removeEventListener('icecandidate', icecandidate);
        peerConnection.current.removeEventListener('track', track);
        peerConnection.current.close();
        peerConnection.current = null;
    }



    return (
        <WebRtcContext.Provider value={{ socket, socket_W, connectionClosed, setConnectionClosed, captureMedia, setStatus, setRemoteId, peerConnection, statuss, remoteId, myId, remoteMediaStream, createOffer, createAnswer, setRemoteDescription, closeCall }}>
            {children}
        </WebRtcContext.Provider>
    )
}

export { WebRtcProvider, WebRtcContext };