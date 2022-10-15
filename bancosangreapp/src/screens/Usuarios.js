import React,{useState} from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import customConfig from '../../custom-config.json';

export const Usuarios = () => {
	const[nombreU, setNombreU] = useState('');
	const[correo, setCorreo] = useState('');
	const[pass, setPass] = useState('');
	const[repPass, setRepPass] = useState('');

	const agregarUsuario = ()=> {
		if(pass == repPass){
			
			const url = customConfig.apiURL + "Usuarios/";
			var responseJ;
			fetch(url,{
				method: 'POST',
				body:JSON.stringify({
					nombreUsuario: nombreU,
					correo: correo,
					pwd: pass
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})    			
			.then(async function (response) {
				if(response.status == 200){ //finded
					responseJ = await response.json();					
				}
				else if(response.status == 500){ //connection lost
					Alert.alert('Error', 'Intente de nuevo');
				}
				else{ //error
					Alert.alert('Error', 'Credenciales inválidas');
				}
			}).then(function (data) {
				console.log(data);
			});			
		}
	}			

  return (
    <>
			<View style = {styles.contenedorForm}>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Nombre de usuario</Text>
					<TextInput             
							style = {styles.cajaTexto}
							placeholder='Ingrese nombre de usuario'
							placeholderTextColor= 'white'	
							onChangeText={(value) => setNombreU(value)}						
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Correo electronico</Text>
					<TextInput             
							style = {styles.cajaTexto}
							keyboardType='email-address'
							placeholder='Ingrese correo electronico'
							placeholderTextColor= 'white'	
							onChangeText={(value) => setCorreo(value)}								
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Contraseña</Text>
					<TextInput             
							style = {styles.cajaTexto}							
							placeholder='Ingrese contraseña'
							placeholderTextColor= 'white'			
							secureTextEntry = {true}		
							onChangeText={(value) => setPass(value)}				
					/>
				</View>
				<View style = {styles.contenedorCampos}>
					<Text style = {styles.tituloCampo}>Repita contraseña</Text>
					<TextInput             
							style = {styles.cajaTexto}							
							placeholder='Repita contraseña'
							placeholderTextColor= 'white'			
							secureTextEntry = {true}		
							onChangeText={(value) => setRepPass(value)}				
					/>
				</View>
				<TouchableHighlight
          onPress={() => agregarUsuario()}
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
