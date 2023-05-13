import React from 'react';
import { io } from "socket.io-client";
import { CHAT_SOCKET_URL, CALL_SOCKET_URL } from '../../types/link'

const WebRtcContext = React.createContext();

const WebRtcProvider = ({ children }) => {

    var socket = React.useMemo(() => { return io.connect(CHAT_SOCKET_URL) }, []);

    return (
        <WebRtcContext.Provider value={{ socket }}>
            {children}
        </WebRtcContext.Provider>
    )
}

export { WebRtcProvider, WebRtcContext };