/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { showFloatingBubble, hideFloatingBubble, requestPermission, initialize } from "react-native-floating-bubble"
import { AppRouter } from './source/routes';
// import AppNavigator from './source/routes/AppNavigator';
import AuthNavigator from './source/routes/AuthNavigator';
import { NativeEventEmitter, NativeModules } from 'react-native';

// requestPermission()
//   .then(() => console.log("Permission Granted"))
//   .catch(() => console.log("Permission is not granted"))

// Initialize bubble manage

// Hide Floatin Bubble
// hideFloatingBubble()
//   .then(() => console.log("Floating Bubble Removed"));
const App = () => {

  const { RNFloatingBubble } = NativeModules;

  const floatingBubble = new NativeEventEmitter(RNFloatingBubble);
  const subscription = floatingBubble.addListener(
    'loating-bubble-press',
    (e) => console.log(e)
  );
  useEffect(() => {

    initialize()
      .then(() => console.log("Initialized the bubble mange"))


    // Show Floating Bubble: x=10, y=10 position of the bubble
    showFloatingBubble(10, 10)
      .then(() => console.log("Floating Bubble Added"));
    const subscription = floatingBubble.addListener(
      'loating-bubble-press',
      (e) => console.log(e)
    );


    return () => subscription.remove();

  }, [])



  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;