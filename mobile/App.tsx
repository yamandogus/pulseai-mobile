import { StatusBar } from 'expo-status-bar';
import './global.css';
import App from './src/app/index';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// StatusBar'ı tema bazlı yapmak için ayrı bir bileşen
function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? 'light' : 'dark'} />;
}

export default function RootApp() {
  return (
    <ThemeProvider>
      <App />
      <ThemedStatusBar />
    </ThemeProvider>
  );
}