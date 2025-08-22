/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />
/// <reference types="@capacitor/status-bar" />
// Configuração final para build no iOS


import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.inteligenciatitan.app',
  appName: 'titanapp',
  webDir: 'www',
  server: {
    url: 'https://inteligenciatitan.com.br',
    cleartext: true,
    errorPath: 'offline.html', // fallback quando offline
  },
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    StatusBar: {
      overlaysWebView: true, // webview sobrepõe barra de status
      style: 'LIGHT', // ícones brancos
      backgroundColor: '#000000',
    },
    EdgeToEdge: {
      backgroundColor: '#000000',
    },
    SplashScreen: {
      launchShowDuration: 0,       // não precisa mostrar por tempo fixo
      launchAutoHide: false,       // esconder manualmente
      backgroundColor: '#101212',  // mesmo fundo do offline
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
};

export default config;
