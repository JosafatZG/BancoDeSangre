import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export const CardUsuarios = ({key, nombre, correo, id}) => {
  return (
    <>
      <View>
				<View style = {styles.cartaUsuario}>													
					<Text style = {styles.informacion}>Usuario: {nombre}</Text>
					<Text style = {styles.informacion}>Correo: {correo}</Text>	
					<TouchableHighlight
        		onPress={() => alert('Usuario eliminado exitosamente')}
      		>
						<View style={styles.buttonContainer}>
							<Text style={styles.button}>Eliminar usuario</Text>
						</View>
      		</TouchableHighlight>	

					<TouchableHighlight
        		onPress={() => alert('Usuario eliminado exitosamente')}
      		>
						<View style={styles.buttonContainer}>
							<Text style={styles.button}>Modificar usuario</Text>
						</View>
      		</TouchableHighlight>						
				</View>
			</View>
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
		height: 220,		
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

