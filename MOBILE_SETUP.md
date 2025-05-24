
# Configuration Mobile avec Capacitor

## Prérequis
- Node.js installé
- Pour iOS : macOS avec Xcode
- Pour Android : Android Studio

## Installation initiale

1. **Cloner le projet depuis GitHub**
   ```bash
   git clone <votre-repo-url>
   cd <votre-projet>
   npm install
   ```

2. **Initialiser Capacitor**
   ```bash
   npx cap init
   ```

3. **Ajouter les plateformes**
   ```bash
   npx cap add ios
   npx cap add android
   ```

## Développement

1. **Builder le projet**
   ```bash
   npm run build
   ```

2. **Synchroniser avec les plateformes natives**
   ```bash
   npx cap sync
   ```

3. **Lancer sur émulateur/appareil**
   ```bash
   # Pour Android
   npx cap run android
   
   # Pour iOS (macOS uniquement)
   npx cap run ios
   ```

## Développement en direct

Pendant le développement, l'app mobile se connecte directement au serveur de développement Lovable grâce à la configuration dans `capacitor.config.ts`.

## Fonctionnalités natives disponibles

- GPS et géolocalisation
- Appareil photo et galerie
- Notifications push
- Stockage local
- Partage de contenu
- Et bien plus...

## Déploiement

Pour déployer en production :
1. Modifier l'URL du serveur dans `capacitor.config.ts`
2. Builder avec `npm run build`
3. Synchroniser avec `npx cap sync`
4. Ouvrir le projet natif et déployer via Xcode/Android Studio
