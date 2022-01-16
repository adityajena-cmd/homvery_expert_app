import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreenComponent from '../screens/SplashScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="SplashScreenComponent">
    <Stack.Screen
      name="Splash"
      component={SplashScreenComponent}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;