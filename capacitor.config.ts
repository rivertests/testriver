import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.inteligenciatitan.app',
  appName: 'titanapp',
  webDir: 'www',
  server: {
    url: 'https://inteligenciatitan.com.br', // seu servidor remoto
    cleartext: true
    // REMOVIDO errorPath pois fallback offline será pelo AppDelegate
  },
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#000000',
    },
    EdgeToEdge: {
      backgroundColor: '#000000',
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: '#101212',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;
