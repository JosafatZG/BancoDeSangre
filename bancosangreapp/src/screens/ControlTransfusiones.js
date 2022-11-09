import React, { useState, useEffect} from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import customConfig from '../../custom-config.json';
import { CardBolsaTransf } from '../components/CardBolsaTransf';

export const ControlTransfusiones = ({navigation}) => {
	const[modalVisible , setModalVisible] = useState(false);

	const[nombresD, setnombresD] = useState('');
	const[fechaDonacion, setFechaD] = useState('')
	const[cantidadMl, setCantidadMl] = useState('');

	const[lista,setLista] = useState([]);
	const[listaP,setListap] = useState([]);

	const getLista = () => {
		var responseJ;
		axios({
			url: customConfig.apiURL + "Bolsas/?",
			method: 'GET'
		}).then(async (response) => {
			responseJ = await response.json
			var list = response.data;
			list = list.filter(l => l.receptorId != null);
			setLista(list)
		})
	}
	useEffect(()=>{
		getLista();
	}, [])

	const buscarBolsas = async (nombre) => {
		console.log(nombre);
		const url =
			customConfig.apiURL + "Bolsas/Buscar?" + new URLSearchParams({
				nombre: nombre,
			});
		try {
			var responseJ;
			await fetch(url)
				.then(async function (response) {
					if (response.status == 200) { //finded
						responseJ = await response.json();
						var list = responseJ;
						list = list.filter(l => l.receptorId != null);
						setLista(list);
						//console.log(responseJ);
					}
				}).then(function (data) {
					//console.log(data);
				});
			//console.log(responseJ);
		} catch (error) {
			//console.log(error);
		}
	}

    return(
    <>
        <View style= {styles.contenedorBuscador}>
          <TextInput             
            style = {styles.cajaTexto}							
            placeholder='Ingrese paciente para buscar bolsa/s'
            placeholderTextColor= '#C43B58'
			onChangeText={(value) => buscarBolsas(value)}
          />
        </View>
        <ScrollView>
			{
				lista.map((item,index)=>{
					return(
						<View key={index}>
							<CardBolsaTransf
							navigation={navigation}
							donante ={item.donanteId}
							cantidad= {item.cantidadml}
							fechaD={item.fechaDonacion}
							id={item.id}
							tipoBolsa = {item.tipoBolsaId}
							receptor={item.receptorId}
							fechaA={item.fechaAplicacion}
							/>
						</View>
					)
				})
			}
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