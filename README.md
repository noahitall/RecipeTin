# RecipeTin
<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

A recipe manager React Native app using Expo and Realm db. Recipes are stored on device. Roadmap features include syncing recipes to all devices, sharing a recipe tin with other users, importing recipes via image capture text extraction or url fetch and parse.

## 🚀 Development

## Base Template

This package is based on expo template @realm/expo-template-js

|  Required Prerequisites  |
|  -- |
| node | 
| npm or yarn | 
| expo | 
| [Setup development Environment](https://reactnative.dev/docs/environment-setup) | 
| Register ios device (to develop on ios devices) |


### How to install the `expo-cli`:
```
npm install --global expo-cli
```
or
```
yarn global add expo-cli
```

## 🏃 How to build and run locally

### Install packages and cocoapods for ios native features
```
npm install
cd ios && pod install && cd ..
```


- Build/Run on iOS with option to select from devices registered with XCode 🍎
```
npx expo run:ios -d
```
### When running on device the package is signed by an xcode generated cert. The device does not (and should not) trust the package by default so you might see an error at this step the first time it runs. On your device with developer mode enabled, open Settings... General... VPN & Device Management and you should see the developer app, tap on it and allow it to run. Rerun the npx command above and it should work.

- Build/Run on iOS Simulator 🍎
```
npx expo run:ios
```

## 🔀 Setting up sync

See https://github.com/realm/realm-js/blob/master/templates/docs/sync-setup.md for instructions.

## ☁️ Build in the cloud

- [Building with EAS](https://docs.expo.dev/eas/)

## 📝 Notes
- [React Native docs](https://reactnative.dev/docs/getting-started)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Setting Up Realm Sync](https://docs.mongodb.com/realm/sdk/react-native/quick-start/)
- [Realm JS Documentation](https://docs.mongodb.com/realm/sdk/react-native/)
- [@realm/react Readme](https://github.com/realm/realm-js/tree/master/packages/realm-react#readme)
