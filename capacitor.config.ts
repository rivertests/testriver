/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />
/// <reference types="@capacitor/status-bar" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.inteligenciatitan.app',
  appName: 'titanapp',
  webDir: 'www',
  server: {
    url: 'https://inteligenciatitan.com.br',
    cleartext: true,
    errorPath: 'offline.html' // GARANTE QUE O FALLBACK ESTÁ CONFIGURADO
  },
  android: {
    adjustMarginsForEdgeToEdge: 'force'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'LIGHT',
      backgroundColor: '#000000'
    },
    EdgeToEdge: {
      backgroundColor: '#000000'
    },
    SplashScreen: {
      launchShowDuration: 3000,       // MOSTRA A SPLASH POR 3 SEGUNDOS
      launchAutoHide: true,          // ESCONDE AUTOMATICAMENTE
      backgroundColor: '#101212',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;