An react native app conneceted to firebase and firestore. So far just for training purposes. I doubt a gamehub witt tic tac toe ever will go commercial.

## Im running Ubuntu 20. And here are the commands I use and some of the sites for more info:

Install dependencies:

- yarn

Open emualtor apps

- https://developer.android.com/studio/run/managing-avds

Install the app

- npx react-native run-android

Run the app

- react-native start

Run rules test

- cd test
- firebase --only firestore emulators:exec "npm test"

Deploy rules:

- firebase deploy --only firestore:rules

Visual studio plugins:

- https://marketplace.visualstudio.com/items?itemName=ChFlick.firecode

Getting the app on physical local phone

- https://reactnative.dev/docs/running-on-device
- https://developer.android.com/studio/run/device

Find the id of your device

- lsusb # Bus 001 Device 075: ID 0e8d:201c MediaTek Inc. moto g(8) power lite

Add the device

- echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="0e8d", ATTR{idProduct}=="201c", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules

Add user to plugdev (need to logout/login to take effect)

- sudo usermod -a plugdev userName
- groups userName # userName : plugdev ( can of course be in other groups aswell)

Connect your phone with usb

- adb devices
  List of devices attached
  ZE2224M33R device (if unauthorized open phone and accept)
- Then run the install app and run app commands above.
