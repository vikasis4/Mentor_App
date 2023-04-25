import React from 'react';
import MainStack from './src/navigation/MainStack';
import { StudentProvider } from './src/context/Students'
import { VerifyProvider } from './src/context/Verify';
import { WebRtcProvider } from './src/context/WebRtc';

function App(): JSX.Element {

  return (
    <StudentProvider>
      <VerifyProvider>
        <WebRtcProvider>
          <MainStack />
        </WebRtcProvider>
      </VerifyProvider>
    </StudentProvider>
  );
}

export default App;
