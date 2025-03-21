import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FocusProvider } from './context/FocusContext'; // Asegúrate de que la ruta sea correcta
import HomeScreen from './components/HomeScreen'; // Asegúrate de que la ruta sea correcta
import WifiScreen from './components/WifiScreen'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <FocusProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WiFi" component={WifiScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FocusProvider>
  );
}
