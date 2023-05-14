import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RTCView } from 'react-native-webrtc';
import { WebRtcContext } from '../context/WebRtc';
import { font } from '../variables/files';
import Timer from '../components/Timer';
import { sendFcm_Call } from '../functions/webrtc'

const Call = (props: any) => {

  const context = React.useContext(WebRtcContext);
  const [signal, setSignal] = useState(false);
  const [onGoing, setOnGoing] = useState(false);
  const { name, roomId, chatId, studentId, status, fcm_token } = props.route.params;
  var { remoteMediaStream, connectionClosed, socket_W, setConnectionClosed, captureMedia, statuss, setStatus, setRemoteId, createOffer, remoteId, myId, closeCall } = context;

  useEffect(() => {
    if (!onGoing) { 
      captureMedia();
      sendFcm_Call({ fcmToken: fcm_token, socketId: myId })
    }
  }, [])
  
  useEffect(() => {
    if (remoteId && myId) {
      setOnGoing(true)
      setSignal(true);
    }
  }, [myId, remoteId])
  
  useEffect(() => {
    if (connectionClosed && onGoing) {
      setOnGoing(false)
      setConnectionClosed(false)
      setStatus('Pending');
      setRemoteId(null);
      closeCall();
      props.navigation.goBack();
    }
  }, [context, connectionClosed])

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>RankBoost</Text>
      <Text style={styles.txt2}>{name}</Text>
      {
        statuss === 'completed' || statuss === 'connected' ?
          <Timer />
          :
          ''
      }
      <Text style={[styles.txt4, { color: statuss === 'completed' || statuss === 'connected' ? 'lime' : 'orange' }]}>Status - {statuss}</Text>
      <View style={styles.signal}>
        <Text style={styles.txt3}>Signal</Text>
        <View style={[styles.sig, { backgroundColor: signal ? 'lime' : 'red' }]}></View>
      </View>
      {
        remoteMediaStream &&
        <>
          <RTCView
            style={styles.video}
            streamURL={remoteMediaStream.toURL()}
          />
        </>
      }
      <View style={styles.cont}>
        <Text style={styles.btn} onPress={createOffer} >
          Start the Call
        </Text>
        <Text style={styles.btn} onPress={() => { setConnectionClosed(true), socket_W.emit('close', { to: remoteId }) }} >
          Leave the Call
        </Text>
      </View>
    </View>
  )
}

export default Call

const styles = StyleSheet.create({
  video: { height: 0, width: 0, backgroundColor: 'green' },
  container: { flex: 1, backgroundColor: '#343434', alignItems: 'center' },
  txt: { fontFamily: font.f3, fontSize: 32, textAlign: 'left', width: '90%', paddingTop: 10 },
  txt2: { paddingTop: 60, paddingBottom: 20, fontFamily: font.f4, fontSize: 30, textAlign: 'center' },
  txt3: { fontFamily: font.f3, fontSize: 20, textAlign: 'center' },
  txt4: { fontFamily: font.f3, fontSize: 17, textAlign: 'center', borderBottomWidth: 4, paddingBottom: 6, paddingTop: 60 },
  signal: { flexDirection: 'row', width: '90%', gap: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 10, backgroundColor: 'black', marginVertical: 20 },
  sig: { height: 14, width: 14, borderRadius: 50, elevation: 10 },
  btn: { backgroundColor: 'skyblue', textAlign: 'center', width: '90%', fontFamily: font.f4, paddingVertical: 10, borderRadius: 6, color: 'black' },
  cont: { paddingBottom: 20, position: 'absolute', width: '100%', bottom: 0, gap: 10, alignItems: 'center' }
})