import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const MenuUsuario = ({navigation}) => {
  return (
    <>		
			<View>
				<ScrollView>
					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/paciente.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => navigation.navigate('Pacientes')}
						>
							<Text style = {styles.tituloOpciones}>Registro de pacientes</Text>
						</TouchableHighlight>						
					</View>

					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/lista.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => alert('Control de pacientes')}
						>
							<Text style = {styles.tituloOpciones}>Control de pacientes</Text>
						</TouchableHighlight>						
					</View>

					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/donacion.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => alert('Registro de donaciones')}
						>
							<Text style = {styles.tituloOpciones}>Registro de donaciones</Text>
						</TouchableHighlight>						
					</View>

					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/listacontroldonaciones.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => alert('Control de donaciones')}
						>
							<Text style = {styles.tituloOpciones}>Control de donaciones</Text>
						</TouchableHighlight>						
					</View>

					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/bolsasangre.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => alert('Administración de bolsas de sangre')}
						>
							<Text style = {styles.tituloOpciones}>Administración de bolsas de sangre</Text>
						</TouchableHighlight>						
					</View>

					<View style = {styles.cartaMenu}>
						<View style = {styles.decoracionCarta}>			
							<View style = {styles.contenedorimg}>
								<Image 
									source={require('../img/jeringa.png')}
								/>	
							</View>			
						</View>	
						<TouchableHighlight
						 	style = {styles.contenedorinfo}
							onPress = {() => alert('Registro de transfusiones')}
						>
							<Text style = {styles.tituloOpciones}>Registro de transfusiones</Text>
						</TouchableHighlight>						
					</View>
				</ScrollView>
			</View>
    </>
  )
}

const styles = StyleSheet.create({
	cartaMenu : {
		backgroundColor: 'white',
		height: 150,		
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
		flexDirection: 'row'
	},
	decoracionCarta:{
		backgroundColor: '#C43B58',
		width: 120,
		height: 150,
		borderRadius:10		
	},
	contenedorimg:{
		alignItems: 'center',
		margin: 20
	},
	contenedorinfo:{		
		width: 253,		
		flexDirection: 'row',
		borderRadius: 10,
		alignItems:'center',
	
	},
	tituloOpciones: {
		color: '#C43B58',
		fontSize: 30,
		marginLeft: 50
	}
})
