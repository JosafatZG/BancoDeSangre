import React, { useEffect, useState } from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import customConfig from '../../custom-config.json';

export const EditUsuario = ({ route, navigation }) => {
	const { id } = route.params;
	const [userInfo, setUserInfo] = useState({});
	const [nombreU, setNombreU] = useState('');
	const [correo, setCorreo] = useState('');
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const getUserInfo = () => {
		var responseJ;
		axios({
			url: customConfig.apiURL + "Usuarios/" + id,
			method: 'GET'
		}).then(async (response) => {
			//responseJ = await response.json
			setUserInfo(response.data)
			setNombreU(response.data.nombreUsuario)
			setCorreo(response.data.correo)
		})
	}

	useEffect(() => {
		getUserInfo();
	}, [])

	const editarUsuario = () => {
		if (nombreU == '' || correo == '') {
			Alert.alert('Error', 'Existen campos vacíos');
		}
		else if (!validateEmail(correo)) {
			Alert.alert('Error', 'Ingrese un correo electrónico válido');
		}
		else {
			const url = customConfig.apiURL + "Usuarios/?" + new URLSearchParams({
				id: id,
				nombreUsuario: nombreU,
				correo: correo
			});
			fetch(url,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				})
				.then(async function (response) {
					console.log(response.status)
					if (response.status == 200 || response.status == 201) { //finded
						Alert.alert('Éxito', 'Usuario editado correctamente');
						navigation.dispatch('Control de usuarios')
						navigation.navigate('Control de usuarios')
					}
					else if (response.status == 500) { //connection lost
						Alert.alert('Error', 'Intente de nuevo');
					}
					else { //error
						Alert.alert('Error', 'Intente más tarde');
					}
				}).then(function (data) {
					console.log(data);
				}).catch(function (error) {
					console.log(error);
				})
		}
	}

	return (
		<>
			<View style={styles.contenedorForm}>
				<View style={styles.contenedorCampos}>
					<Text style={styles.tituloCampo}>Nombre de usuario</Text>
					<TextInput
						style={styles.cajaTexto}
						placeholder='Ingrese nombre de usuario'
						placeholderTextColor='white'
						defaultValue={userInfo.nombreUsuario}
						onChangeText={(value) => setNombreU(value)}
					/>
				</View>
				<View style={styles.contenedorCampos}>
					<Text style={styles.tituloCampo}>Correo electronico</Text>
					<TextInput
						style={styles.cajaTexto}
						keyboardType='email-address'
						placeholder='Ingrese correo electronico'
						placeholderTextColor='white'
						defaultValue={userInfo.correo}
						onChangeText={(value) => setCorreo(value)}
					/>
				</View>
				<TouchableHighlight
					onPress={() => editarUsuario()}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.button}>Editar usuario</Text>
					</View>
				</TouchableHighlight>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	contenedorForm: {
		backgroundColor: '#C43B58',
		height: 325,
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
	cajaTexto: {
		height: 40,
		width: 330,
		marginTop: 15,
		borderWidth: 2,
		padding: 10,
		color: 'white',
		fontSize: 15,
		borderRadius: 10,
		borderColor: 'white'
	},
	button: {
		fontSize: 20,
		color: '#C43B58',
		fontWeight: 'bold',
		padding: 8,
	},
	buttonContainer: {
		backgroundColor: 'white',
		marginTop: 10,
		borderRadius: 2,
		width: 300,
		alignItems: 'center',
		marginLeft: 35
	}
})
