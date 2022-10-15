import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import customConfig from '../../custom-config.json';

export const Login = ({ navigation }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    const url =
      customConfig.apiURL + "Usuarios/Login?" + new URLSearchParams({
        NombreUsuario: nombreUsuario,
        Pwd: pwd,
      });
    try {
      var responseJ;
      await fetch(url)
        .then(async function (response) {
          if(response.status == 200){ //finded
            responseJ = await response.json();
            navigation.navigate('Menu usuario')
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
      console.log(responseJ);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text style={styles.titulo1}>Banco de sangre</Text>
      <View style={styles.imgContainer}>
        <Image source={require('../img/gotasagre.png')} style={styles.img} />
      </View>
      <Text style={styles.titulo2}>¡Bienvenido!</Text>
      <View style={styles.cards}>
        <Text style={styles.cardTitle}>Usuario:</Text>
        <TextInput
          keyboardType='default'
          placeholder='Ingrese su usuario'
          placeholderTextColor={'white'}
          style={styles.cardText}
          onChangeText={(value) => setNombreUsuario(value)}
        />
        <Text style={styles.cardTitle}>Contraseña:</Text>
        <TextInput
          keyboardType='default'
          placeholder='Ingrese su contraseña'
          placeholderTextColor={'white'}
          secureTextEntry={true}
          style={styles.cardText}
          onChangeText={(value) => setPwd(value)}
        />
        <TouchableHighlight
          onPress={() => { login() }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>Ingresar</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="¿Olvidó su contraseña?"
          onPress={() => navigation.navigate('Recuperacion')}
        />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  img: {
    height: 150,
    width: 150,
    marginBottom: 10
  },
  titulo1: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 10,
  },
  titulo2: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  cards: {
    backgroundColor: '#C43B58',
    height: 255,
    width: '97.5%',
    margin: 5,
    borderRadius: 14,
    alignItems: 'center',
    shadowRadius: 2,
    shadowColor: 'black',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  cardTitle: {
    fontSize: 25,
    color: '#ffffff',
    marginTop: 10
  },
  cardText: {
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
  button: {
    fontSize: 20,
    color: '#C43B58',
    fontWeight: 'bold',
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 2
  },
});