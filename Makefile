# simulator name for iOs
SIMULATOR := iPhone 11

mock-server:
	yarn generate-mock-data && yarn start-mockapi

setup:
	watchman watch-del-all
	rm -rf ./node_modules
	yarn
	# node simulator_edit_config.js
	rm -rf ./ios/Pods
	rm -f ./ios/Podfile.lock
	# arch -x86_64 npx react-native link
	arch -x86_64 pod install --project-directory='./ios/'
	arch -x86_64 npx react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'
# ios run application
start-ios:
	arch -x86_64 npx react-native run-ios --scheme development --simulator="$(SIMULATOR)"

start-ios-staging:
	arch -x86_64 npx react-native run-ios --scheme staging --simulator="$(SIMULATOR)"
	start-ios-production:
	arch -x86_64 npx react-native run-ios --scheme Production

# android run application
start-android:
	ENVFILE=.env arch -x86_64 npx react-native run-android
	cd $$HOME/Library/Android/sdk/emulator/ && ./emulator -avd $$(./emulator -list-avds | tail -n 1)
	adb reverse tcp:3000 tcp:3000

start-android-staging:
	ENVFILE=.env.staging arch -x86_64 npx react-native run-android
	cd $$HOME/Library/Android/sdk/emulator/ && ./emulator -avd $$(./emulator -list-avds | tail -n 1)

start-android-production:
	ENVFILE=.env.production arch -x86_64 npx react-native run-android
	cd $$HOME/Library/Android/sdk/emulator/ && ./emulator -avd $$(./emulator -list-avds | tail -n 1)

test:
	yarn test

test-watch:
	yarn test-watch

open-xcode:
	xed -b ios