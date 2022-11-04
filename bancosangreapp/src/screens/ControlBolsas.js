import React, { useState, useEffect} from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import customConfig from '../../custom-config.json';

export const ControlBolsas = ({navigation}) => {
    return(
    <>
        <View style= {styles.contenedorBuscador}>
            <TextInput             
                style = {styles.cajaTexto}							
                placeholder='Ingrese paciente para buscar bolsa/s'
                placeholderTextColor= '#C43B58'										
            />
        </View>
        <ScrollView>
            <View style = {styles.cartaPaciente}>
					<TouchableHighlight 
						onPress={() => setModalVisible(true)}
					>
						<View style = {styles.contenedorContenido}>
							<Text style = {styles.informacion}>Donante: Manuel Araniva </Text>
							<Text style = {styles.informacion2}>Tipo de sangre: B</Text>
							<Text style = {styles.informacion}>Tipo de RH: Positivo</Text>
                            <Text style = {styles.informacion}>Cantidad ml: 500</Text>
						</View>
					</TouchableHighlight>
				</View>
        </ScrollView>
    </>
    );

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
	},
    informacion: {
		margin: 10,
		color: 'white',
		fontSize: 19,
		fontWeight: 'bold'
	},
	informacion2: {
		marginLeft: 10,
		color: 'white',
		fontSize: 19,
		fontWeight: 'bold',		
	},
    contenedorContenido: {		
		height: 150,
		margin: 20,
		height: 160
	},
    cartaPaciente : {
		backgroundColor: '#C43B58',
		height: 180,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
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
	},
})