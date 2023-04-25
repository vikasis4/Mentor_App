import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { WebRtcContext } from "../context/WebRtc";
import { RTCView, mediaDevices, RTCIceCandidate } from 'react-native-webrtc';
import { font } from "../variables/files";
import axios from "axios";
import { FCM } from "../../types/link";
import Alert from '../components/Alert';
var toks = 'cRk6Th18Q6GU3FV4xS-J2e:APA91bEWALbC7YgUi75lsHhQQ5DI-F5qP7Ub2z3wOTzDp0dfiJjPk4oAV1l-6kGJOJmMUD3-tcbwBt9sQru-Z0iZsPvalVU_3j_stXhmIaBQic5vXSahzGAv2E9hV1F3TXmwq6rR_sR5'


const Call = () => {

  const webrtc = React.useContext(WebRtcContext);
  const { socketId, setSocketId, socket, peer, getAnswer, setLocalDescription, getOffer } = webrtc;
  const [myStream, setMyStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState<any>();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const run = async () => {
      await axios.post(FCM, {
        socket_id: socketId.mentor,
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
    run()
  }, [])


  ////////////////GET OFFER/////////////////////////
  const studentOffer = useCallback(async ({ offer, from }: any) => {//1\\
    setConnected(true);
    setSocketId({ ...socketId, student: from });
    // const stream = await mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true,
    // });

    // setMyStream(stream);
    // for (const track of stream.getTracks()) {
    //   peer.addTrack(track, stream);
    // }

    const ans = await getAnswer(offer);
    socket.emit("offer-accepted", { to: from, ans });
  }, [socket])//1\\


  /////////// HANDLE NEGOCIATION ////////////////////
  const handleNegoNeeded = useCallback(async () => {
    const offer = await getOffer();
    socket.emit("peer:nego:needed", { offer, to: socketId.student });
  }, [socketId, socket]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: any) => {
      const ans = await getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]);

  const handleNegoNeedFinal = useCallback(async ({ ans }: any) => {
    await setLocalDescription(ans);
  }, []);

  ////////////////////// ICE CANDIDATE /////////////////////
  const handleIceCandidate = useCallback(async (event: any) => {
    socket.emit('ice-candidate', { to: socketId.mentor, candidate: event.candidate })
  }, []);
  const setIceCandidate = useCallback(async ({ candidate }: any) => {
    peer.addIceCandidate(new RTCIceCandidate(candidate))
  }, []);

  /////////// HANDLE TRACKS ////////////////////
  const handleTracks = async (ev: any) => {
    const remoteStream = ev.streams;
    setRemoteStream(remoteStream[0]);
  }

  /////////// HANDLE PEER ////////////////////
  useEffect(() => {
    peer.addEventListener("track", handleTracks);
    peer.addEventListener("onicecandidate", handleIceCandidate);
    return () => {
      peer.removeEventListener("track", handleTracks);
      peer.removeEventListener("onicecandidate", handleIceCandidate);
    };
  }, [handleNegoNeeded]);

  /////////// HANDLE SOCKETS ////////////////////
  useEffect(() => {
    socket.on('student-offer', studentOffer);
    socket.on("ice-candidate", setIceCandidate);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket.off('student-offer', studentOffer);
      socket.off("ice-candidate", setIceCandidate);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    }
  }, [socket, studentOffer, handleNegoNeedIncomming, handleNegoNeedFinal])


  return (
    <>
      {
        connected ?
          <View style={styles.cont}>
            {remoteStream && (
              <>
                <Text style={styles.txt3}>Remote Stream</Text>
                <RTCView
                  mirror={true}
                  objectFit={'cover'}
                  streamURL={remoteStream.toURL()}
                  style={styles.video} />
              </>
            )}
          </View>
          :
          <Text style={styles.txt3}>Connecting</Text>
      }
    </>
  )
}

export default Call

const styles = StyleSheet.create({
  video: {
    borderWidth: 1,
    borderColor: 'white',
    height: 200,
    width: 300
  },
  cont: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  txt3: {
    fontFamily: font.f2,
    color: 'white',
    textAlign: 'center',
    paddingTop: 40
  }
})