# hello-world App

Chat app built for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location. Expo and Expo Go are used to interface with/test functionality on multiple devices.

## Video Demo

https://github.com/brett-ranieri/hello-world/assets/115497904/f238f021-54f2-4eb2-bfae-8a2ab69b0d82

Demo shows a user entering the chat and communicated via text while completeting the following tasks:

- Choosing a picture from Photo library and sending as message
- Taking a picture with Camera and sending as message
- Sending their location in a message
- Receiving a picture sent from another user

## Screenshots

<img height="800" alt="5 5_screenshot1" src="https://github.com/brett-ranieri/hello-world/assets/115497904/79cc5d37-fe50-48cc-8aa3-79f012ab4e7e">

<img height="800" alt="5 5_screenshot2" src="https://github.com/brett-ranieri/hello-world/assets/115497904/0fc86277-3a0c-4543-8531-53511524f31a">

## Get Project Running

### Personal Mobile Device

- Download main branch from GitHub
- Download Expo Go app onto mobile device
- Navigate to root folder (hello-world) in terminal
- Install all depencies by running `npm install`
- Run the following `expo start --tunnel`
- When Metro Bundler has finished, scan QR Code (must open app to scan code on Android, can just scan with Camera app on iOS)

<img width="332" alt="5 5_metro_bundler" src="https://github.com/brett-ranieri/hello-world/assets/115497904/64041437-81a9-475b-b439-293414825a5c">

### Android Studio Device Emulator

- Download [Android Studio](https://developer.android.com/studio?gad=1&gclid=CjwKCAjwge2iBhBBEiwAfXDBRxKMwoaxlmliEE1UEwtMiAjGMOto_4N2Scn0sJxzMKtHago9MBL1LRoC6I8QAvD_BwE&gclsrc=aw.ds) 
- Follow provide docs to [Configure Android Studio](https://developer.android.com/studio/intro/studio-config)
- Start device in Android Studio using device manager
- Follow "Personal Mobile Device" instructions above to start Metro Bundler
- Once Metro Bundler is finished and you see the above screenshot in your terminal:
    - Press `a` to open with Android, after successfully compiled Expo Go will open on emulator and app will open after completion of Bundling. (Note, if Expo Go has not be installed on emulated device you may need to follow prompts to install.)

## Development Dependencies

- "@babel/core": "^7.20.0"

## Project Dependencies

- "@expo/webpack-config": "^0.17.2",
- "@react-navigation/native": "^6.1.6",
- "@react-navigation/native-stack": "^6.9.12",
- "expo": "^47.0.0",
- "expo-status-bar": "~1.4.2",
- "firebase": "^9.13.0",
- "react": "18.1.0",
- "react-native": "0.70.5",
- "react-native-gifted-chat": "^2.0.1",
- "react-native-safe-area-context": "4.4.1",
- "react-native-screens": "~3.18.0",
- "react-native-web": "~0.18.7",
- "@react-native-community/netinfo": "9.3.5",
- "@react-native-async-storage/async-storage": "~1.17.3",
- "expo-location": "~15.0.1",
- "react-native-maps": "1.3.2",
- "expo-image-picker": "~14.0.2"
