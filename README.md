# AQ Green

#### React Native App for AQ Green team.

###### This is prototype ( IOS only )

❗ Requirements:

- [Node.js](https://nodejs.org/en/) `>=15.8.0`
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) `v12.4`
- [yarn](https://yarnpkg.com/getting-started/install) `>= 1.22.10`
- [Cocoapods](https://cocoapods.org/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

## Project Setup

Run instructions below to setup AQ Green on MacOS.

Install dependencies in the project folder.

```
make setup
```

### Run on IOS

To start the app on iOs with `.env` file configuration run. (Also make sure that you have server api app up and running at http://localhost:3000.)

```
make start-ios
```

To start on specific simulator run with `SIMULATOR` parameter. For example `SIMULATOR="iPhone XR"` will start the app on iPhone XR simulator.

```
make start-ios SIMULATOR="iPhone XR"
```

### Debugging

Pres ⌘+R to reload.

Press ⌘+D for iOs to see debug menu. Also see [React Native Debugging Guide](https://reactnative.dev/docs/debugging).
