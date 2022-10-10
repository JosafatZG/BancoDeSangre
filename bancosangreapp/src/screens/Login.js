import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const Login = ({ navigation }) => {  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
			<Button
        title="Ir a recuperación"
        onPress={() => navigation.navigate('Recuperacion')}
      />
    </View>
  )
}
