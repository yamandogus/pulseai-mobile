import { StatusBar } from 'expo-status-bar';
import './global.css';
import App from './src/app/index';

export default function RootApp() {
  
  return (
    <>
      <App />
      <StatusBar style="auto" />
    </>
  );
}