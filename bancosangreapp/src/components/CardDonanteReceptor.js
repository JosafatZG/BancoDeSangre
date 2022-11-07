import React, { useEffect, useState } from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import customConfig from '../../custom-config.json';

export const CardDonanteReceptor = ({id, nombre, apellido, tipoSangreid, tipoRhid}) => {

  return (    
    <>
      <View>
				<View style={styles.cartaUsuario}>
					<Text style={styles.informacion}>Nombre: {nombre}</Text>
					<Text style={styles.informacion}>Apellido: {apellido}</Text>										
				</View>
			</View>
    </>
  )
}

const styles = StyleSheet.create({
  cartaUsuario: {
		backgroundColor: '#C43B58',
		height: 250,		
    width: 300,
		borderRadius: 10,
		shadowRadius: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,
		elevation: 8,
		flexDirection: 'column'
	},
	informacion: {
		margin: 15,
		fontSize: 19,
		color: 'white',
		fontWeight: 'bold'
	},
})
