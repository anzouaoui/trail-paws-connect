
# Expo Setup Instructions

## Prerequisites
1. Install Expo CLI globally:
   ```bash
   npm install -g @expo/cli
   ```

2. Install Expo Go app on your mobile device:
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## Development

### Start the development server:
```bash
npx expo start
```

### Testing on device:
1. Scan the QR code with Expo Go app
2. The app will load on your device

### Web testing:
```bash
npx expo start --web
```

## Environment Variables

For Firebase configuration, you can set environment variables:
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Create a `.env` file in the root directory with your Firebase configuration.

## Building for Production

### EAS Build (Recommended):
```bash
npm install -g eas-cli
eas build --platform all
```

### Local Build:
```bash
npx expo build:android
npx expo build:ios
```

## Notes
- The app now uses Expo's metro bundler
- Firebase configuration is automatically handled
- All existing React components work without changes
- Path aliases (@/) are configured and working
