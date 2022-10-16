import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { RecuperacionPass } from './src/screens/RecuperacionPass';
import { CambioPass } from './src/screens/CambioPass';
import { MenuUsuario } from './src/screens/MenuUsuario';
import { Pacientes } from './src/screens/Pacientes';
import { Usuarios } from './src/screens/Usuarios';
import { ControlUsuarios } from './src/screens/ControlUsuarios';
import { ControlPacientes } from './src/screens/ControlPacientes';
import { Donacion } from './src/screens/Donacion';

export default function App() {  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recuperacion" component={RecuperacionPass} />
        <Stack.Screen name="Cambio de contraseña" component={CambioPass} />
        <Stack.Screen name="Menu usuario" component={MenuUsuario} />
        <Stack.Screen name="Pacientes" component={Pacientes} />
        <Stack.Screen name="Registro de usuarios" component={Usuarios} />
        <Stack.Screen name="Control de usuarios" component={ControlUsuarios} />
        <Stack.Screen name="Control de pacientes" component={ControlPacientes} />
        <Stack.Screen name="Registro de bolsa" component={Donacion} />
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
