import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { RecuperacionPass } from './src/screens/RecuperacionPass';
import { CambioPass } from './src/screens/CambioPass';
import { MenuUsuario } from './src/screens/MenuUsuario';

export default function App() {  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recuperacion" component={RecuperacionPass} />
        <Stack.Screen name="Cambio de contraseña" component={CambioPass} />
        <Stack.Screen name="Menu usuario" component={MenuUsuario} />
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
