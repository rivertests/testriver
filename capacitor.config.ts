/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />
/// <reference types="@capacitor/status-bar" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.inteligenciatitan.app',
  appName: 'titanapp',
  webDir: 'www',
  // A seção 'server' foi removida
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
      launchShowDuration: 3000,
      launchAutoHide: true,
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

//teste
export default config;