import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trailpawsconnect.app',
  appName: 'Trail Paws Connect',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com', 'apple.com']
    }
  }
};

export default config;
