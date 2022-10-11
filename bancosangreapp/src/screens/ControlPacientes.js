import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export const ControlPacientes = () => {
  return (
    <>
      <View style= {styles.contenedorBuscador}>
			<TextInput             
				style = {styles.cajaTexto}							
				placeholder='Ingrese usuario para buscar'
				placeholderTextColor= '#C43B58'										
			/>
			<ScrollView>
				<View>
					
				</View>
			</ScrollView>

			</View>
    </>
  )
}

const styles = StyleSheet.create({
	cajaTexto : {
    height: 40,
    width: 370,    
    borderWidth: 2,
    padding: 10,
    color: '#C43B58',
    fontSize: 15,  
    borderRadius: 10,
    borderColor: '#C43B58', 
		marginTop: 20 
  },
	contenedorBuscador : {
		alignItems: 'center'
	}
})
