import React from 'react';
import MainStack from './src/navigation/MainStack';
import { StudentProvider } from './src/context/Students'
import { VerifyProvider } from './src/context/Verify';

function App(): JSX.Element {

  return (
    <StudentProvider>
      <VerifyProvider>
        <MainStack />
      </VerifyProvider>
    </StudentProvider>
  );
}

export default App;
