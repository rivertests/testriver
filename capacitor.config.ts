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
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#101212', // A cor de fundo sólida para a splash
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      ios: {
        contentMode: "scaleAspectFit",
        splashFullScreen: true,
        splashImmersive: true
      },
      // logoSplashScale define o tamanho da sua logo sem fundo. 
      // 0.4 = 40% da tela. Ajuste se necessário.
      logoSplashScale: 0.4 
    }
  }
};

export default config;