import React, { useState } from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView , Modal, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";

export const CardPacientes = ({navigation, nombre,apellido, tipoSangre, tipoRH,id}) => {
	const[modalVisible , setModalVisible] = useState(false);

    

  return (
    <>
			<ScrollView>
				<View style = {styles.cartaPaciente}>
					<TouchableHighlight 
						onPress={() => setModalVisible(true)}
					>
						<View style = {styles.contenedorContenido}>
							<Text style = {styles.informacion}>Paciente: {nombre} {apellido}</Text>
							<Text style = {styles.informacion2}>Tipo de sangre: {tipoSangre}</Text>
							<Text style = {styles.informacion}>Tipo de RH: {tipoRH}</Text>
						</View>
					</TouchableHighlight>
				</View>
			</ScrollView>

			<Modal
				animationType='slide'				
				visible = {modalVisible}
				onRequestClose = {() => setModalVisible(!modalVisible)}		
			>
			 <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style = {styles.contenedorForm}>
							<View style = {styles.contenedorInfo}>
								<Text style = {styles.informacionModal}>Nombre:</Text>
								<TextInput             
									style = {styles.cajaTextoModal}							
									placeholder='Ingrese nombre'
									placeholderTextColor= '#C43B58'										
								/>

							<Text style = {styles.informacionModal}>Apellido:</Text>
								<TextInput             
									style = {styles.cajaTextoModal}							
									placeholder='Ingrese apellido'
									placeholderTextColor= '#C43B58'										
								/>

							<Text style = {styles.informacionModal}>Tipo de sangre:</Text>
							<RNPickerSelect
								style={pickerSelectStyles}
								placeholder={{ label: "Seleccione el tipo de sangre", value: null}}								
								items={[
									{ label: "A", value: 2 },
									{ label: "B", value: 3 },
									{ label: "O", value: 4 },
									{ label: "AB", value: 1 },
								]}
							/>

							<Text style = {styles.informacionModal}>Tipo de RH:</Text>
							<RNPickerSelect
								style={pickerSelectStyles}
								placeholder={{ label: "Seleccione el tipo de sangre", value: null}}								
								items={[
									{ label: "Positivo", value: 1 },
									{ label: "Negativo", value: 2 },
            		]}
							/>
							</View>
						</View>
						<View style = {styles.buttonContainer}>
							<TouchableHighlight
								style = {styles.button2}
							>
								<Text style = {styles.txtBtnModal}>Actualizar</Text>
							</TouchableHighlight>	

							<TouchableHighlight
								style = {styles.button2}
							>
								<Text style = {styles.txtBtnModal}>Eliminar</Text>
							</TouchableHighlight>		

							<TouchableHighlight
								style = {styles.button2}
								onPress = {() => setModalVisible(!modalVisible)}
							>
								<Text style = {styles.txtBtnModal}>Cerrar</Text>
							</TouchableHighlight>						
						</View>	
          </View>
        </View>
			</Modal>
			
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