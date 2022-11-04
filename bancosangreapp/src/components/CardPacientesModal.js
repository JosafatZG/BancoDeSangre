import React, { useEffect, useState } from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import customConfig from '../../custom-config.json';
import { Donacion } from '../screens/Donacion';

export const CardPacientesModal = ({navigation, nombre,apellido, tipoSangre, tipoRH,id, setDonanteId, setModalVisible, modalVisible}) => {
	//const[modalVisible , setModalVisible] = useState(false);
	const[nombreTS, setNombreTS] = useState('');
	const[nombreRH, setNombreRH] = useState('');
	const[nombrePaciente,setNombrePaciente] = useState('');
	const[apellidoPaciente,setApellidoPaciente] = useState('');
	const[tipoSangreUp,setTipoSangreUp] = useState('');
	const[tipoRHUp,setTipoRHUp] = useState('');
    const[idPaciente,setId] = useState('');

	var responseJ;
		axios({
			url: customConfig.apiURL + "TipoSangre/" + tipoSangre,
			method: 'GET'
		}).then(async (response) => {
			responseJ = await response.json			
			setNombreTS(response.data["nombreTS"])
		})
		
		var responseJ2;
		axios({
			url: customConfig.apiURL + "TipoRH/" + tipoRH,
			method: 'GET'
		}).then(async (response) => {
			responseJ = await response.json			
			setNombreRH(response.data["nombreRH"])
		})		

		useEffect(() =>{
			setNombrePaciente(nombre);
			setApellidoPaciente(apellido);	
			setTipoSangreUp(tipoSangre);
			setTipoRHUp(tipoRH);
			setId(id)
		},[])
		
		const asignarIdDonante = (id) => {
			setDonanteId(id)
			setModalVisible(!modalVisible)
		}

  return (
    <>
			<ScrollView>
				<View style = {styles.cartaPaciente}>
					<TouchableHighlight 
						onPress={() => asignarIdDonante(id)}
					>
						<View style = {styles.contenedorContenido}>
							<Text style = {styles.informacion}>Paciente: {nombre} {apellido}</Text>
							<Text style = {styles.informacion2}>Tipo de sangre: {nombreTS}</Text>
							<Text style = {styles.informacion}>Tipo de RH: {nombreRH}</Text>
						</View>
					</TouchableHighlight>
				</View>
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
	cartaPaciente : {
		backgroundColor: '#C43B58',
		height: 150,
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
	contenedorContenido: {		
		height: 150,
		margin: 20,
		height: 160
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
	centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
		height: 500,
		width: 350
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
	informacionModal :{
		fontSize: 19,	
		color: '#C43B58'	,
		marginTop: 10
	},
	cajaTextoModal : {
    height: 40,
    width: 300,    
    borderWidth: 2,
    padding: 10,
    color: '#C43B58',
    fontSize: 15,  
    borderRadius: 10,
    borderColor: '#C43B58',
		marginTop: 10
  },
	contenedorForm : {
		backgroundColor: 'white',
		height: 400,
		width: 320
	},
	contenedorInfo: {
		margin: 10
	},
	contenedorBtnModal: {
		/*backgroundColor: 'blue',
		width: 300*/
	},
	button2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: 8,	
		backgroundColor: '#C43B58',
		borderRadius: 10,
		marginLeft: 10,				
  },
  buttonContainer: {
    //backgroundColor: "blue",
    borderRadius: 10,
		flexDirection: 'row'	,			
		
  },
	txtBtnModal: {
		color: 'white',
		fontWeight: 'bold'
	}
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: 300,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
   // marginLeft: 15,
    color: "#C43B58",		 
		
  },
  inputAndroid: {
		height: 40,
    width: 300,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
   // marginLeft: 15,
    color: "#C43B58",
  },
});