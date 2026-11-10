import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeDatabase } from './src/db';
import { MessageSync } from './src/services';

export default function App() {
  useEffect(() => {
    initializeDatabase();
    MessageSync.startSync();
    return () => MessageSync.stopSync();
  }, []);

  return <AppNavigator />;
}