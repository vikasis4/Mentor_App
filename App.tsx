import React from 'react';
import MainStack from './src/navigation/MainStack';
import { StudentProvider } from './src/context/Students'

function App(): JSX.Element {

  return (
    <StudentProvider>
      <MainStack />
    </StudentProvider>
  );
}

export default App;
