import React, { useState, useEffect} from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import customConfig from '../../custom-config.json';
import { CardPacientes } from '../components/CardPacientes';

export const ControlPacientes = ({navigation}) => {
	const[modalVisible , setModalVisible] = useState(false);

	const[nombresP, setNombreP] = useState('');
	const[apellidosP, setApellidosP] = useState('');
	const[fechaNac, setFechaNac] = useState('');
	const[tipoSangre, setTipoSangre] = useState('');
	const[tipoRH, setTipoRH] = useState('');
	const[list, setList] = useState([]);

	const getList = () => {
		var responseJ;
		axios({
			url: customConfig.apiURL + "Pacientes/?",
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
      <View style= {styles.contenedorBuscador}>
				<TextInput             
					style = {styles.cajaTexto}							
					placeholder='Ingrese usuario para buscar'
					placeholderTextColor= '#C43B58'										
				/>
			</View>
			<ScrollView>
				{
					list.map((item,index)=> {
						return(
							<View key={index}>
								<CardPacientes
									navigation={navigation}
									nombre={item.nombres}
									apellido={item.apellidos}
									tipoSangre={item.tipoSangreId}
									tipoRH={item.tipoRHId}
									id={item.id}
								/> 
							</View>
						)
					})
				}
			</ScrollView>
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
	},
})
