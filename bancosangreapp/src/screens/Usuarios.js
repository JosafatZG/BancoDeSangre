import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export const Usuarios = () => {
  return (
    <>
			<View style = {styles.contenedorForm}>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Nombre de usuario</Text>
					<TextInput             
							style = {styles.cajaTexto}
							placeholder='Ingrese nombre de usuario'
							placeholderTextColor= 'white'							
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Correo electronico</Text>
					<TextInput             
							style = {styles.cajaTexto}
							keyboardType='email-address'
							placeholder='Ingrese correo electronico'
							placeholderTextColor= 'white'							
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Contraseña</Text>
					<TextInput             
							style = {styles.cajaTexto}							
							placeholder='Ingrese contraseña'
							placeholderTextColor= 'white'			
							secureTextEntry = {true}				
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Repita contraseña</Text>
					<TextInput             
							style = {styles.cajaTexto}							
							placeholder='Repita contraseña'
							placeholderTextColor= 'white'			
							secureTextEntry = {true}				
					/>
				</View>
				<TouchableHighlight
              onPress={() => alert('Usuario registrado exitosamente')}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>Registrar usuario</Text>
          </View>
        </TouchableHighlight>
			</View>
    </>
  )
}

const styles = StyleSheet.create({
	contenedorForm:{
		backgroundColor: '#C43B58',
		height: 550,
		margin: 10,
		borderRadius: 10
	},
	tituloCampo: {
		color: 'white',
		fontSize: 20,
	},
	contenedorCampos: {
		margin: 20,		
	},
	cajaTexto : {
    height: 40,
    width: 350,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    color: 'white',
    fontSize: 15,  
    borderRadius: 10,
    borderColor: 'white'  
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
		width: 300,
		alignItems: 'center',
		marginLeft: 50
  } 
})
