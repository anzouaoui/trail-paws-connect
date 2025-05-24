
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7582926762454f1bb4b751cae5aea3b3',
  appName: 'trail-paws-connect',
  webDir: 'dist',
  server: {
    url: 'https://75829267-6245-4f1b-b4b7-51cae5aea3b3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#22C55E',
      showSpinner: false
    }
  }
};

export default config;
