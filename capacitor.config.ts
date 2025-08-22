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
    // O Capacitor vai usar este arquivo automaticamente quando a URL falhar
    errorPath: 'offline.html' 
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
      launchShowDuration: 3000,   // Mostra a splash por 3 segundos
      launchAutoHide: true,      // ESCONDE AUTOMATICAMENTE (MUITO IMPORTANTE)
      backgroundColor: '#101212', 
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      ios: {
        contentMode: "scaleAspectFit"
      },
      logoSplashScale: 0.4 
    }
  }
};

export default config;