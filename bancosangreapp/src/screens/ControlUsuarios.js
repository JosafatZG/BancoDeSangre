import React, { Component, useEffect, useState } from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { CardUsuarios } from '../components/CardUsuarios';
import customConfig from '../../custom-config.json';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import axios from 'axios';


export const ControlUsuarios = ({navigation}) => {
	const[nombreU, setNombreU] = useState('');
	const[usuario, setUsuario] = useState('');
	const[correo, setCorreo] = useState('');
	const[datos, setDatos] = useState([]);
	const[list, setList] = useState([]);
	
	const getList = () => {
		var responseJ;
		axios({
			url: customConfig.apiURL + "Usuarios/?",
			method: 'GET'
		}).then(async (response) => {
			responseJ = await response.json
			setList(response.data)
		})
	}

	useEffect(() => {
		getList();
	},[])

  return (
    <>		
		<Text style = {styles.tituloSeccion}>Usuarios</Text>
		<View style = {styles.contenedorBuscador}>
			<TextInput             
				style = {styles.cajaTexto}							
				placeholder='Ingrese usuario para buscar'
				placeholderTextColor= '#C43B58'										
			/>
		</View>					
			<ScrollView>			
				{
					list.map((item, index) => {
					return(
						<View key={index}>
							<CardUsuarios
								navigation={navigation}							
								nombre = {item.nombreUsuario}
								correo = {item.correo}
								id = {item.id}
							/>
						</View>
					)
				})}				
			</ScrollView>
    </>
  )
}

const styles = StyleSheet.create({	
	tituloSeccion: {
		fontSize:25,
		textAlign: 'center',
		margin: 10
	},	
	cartaUsuario : {
		backgroundColor: '#C43B58',
		height: 250,		
		margin: 20,		
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
	button:{
    fontSize:20,
    color:'#C43B58',
    fontWeight:'bold',
    padding:8,		
  },
  buttonContainer:{
    backgroundColor:'white',
    marginTop:10,
    borderRadius:2,
		width: 250,
		alignItems: 'center',
		marginLeft: 50		
  },
	contenedorBuscador: {		
		height: 50,
		marginLeft: 10,
		marginRight: 10,
	},
	cajaTexto : {
    height: 40,
    width: 370,    
    borderWidth: 2,
    padding: 10,
    color: '#C43B58',
    fontSize: 15,  
    borderRadius: 10,
    borderColor: '#C43B58'  
  },
})
