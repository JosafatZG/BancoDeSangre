import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google'
import customConfig from '../../custom-config.json';

export const Login = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "123695429807-kmhi1s402m2ft4j7mf0vgi7okf8bod5e.apps.googleusercontent.com",
    androidClientId: "123695429807-8qirhgcfscmplh1tc68rbk62jk4ogrij.apps.googleusercontent.com",
    iosClientId: "123695429807-2gk0e2us5r4k1d95gmr7rh2pghmbgrib.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
      navigation.navigate('Menu usuario')
    }
  }, [response])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const userinfo = await response.json();
    setUser(userinfo);
  }

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    console.log(user);
    const url =
      customConfig.apiURL + "Usuarios/Login?" + new URLSearchParams({
        NombreUsuario: nombreUsuario,
        Pwd: pwd,
      });
    try {
      var responseJ;
      await fetch(url)
        .then(async function (response) {
          if (response.status == 200) { //finded
            responseJ = await response.json();
            navigation.navigate('Menu usuario')
          }
          else if (response.status == 500) { //connection lost
            Alert.alert('Error', 'Intente de nuevo');
          }
          else { //error
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
      <TouchableOpacity 
      style={styles.googleLogin}
      onPressOut={async () => {
          await promptAsync()
          if (response?.type == "success") {
              setAccessToken(response.authentication.accessToken);
              accessToken && await fetchUserInfo();
              navigation.navigate('Menu usuario')
            }
        }}>
        <Image style={styles.imgLogo} source={require("../../assets/GLogo.png")}></Image>
        <Text style={styles.textLogo}>Iniciar sesion con google</Text>
      </TouchableOpacity>
    </>

  )
}

const styles = StyleSheet.create({
  googleLogin: {
    flexDirection: 'row',
    borderColor: 'gray',
    marginLeft: 105,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  textLogo:{
    marginLeft: 10,
    marginTop: 3,
    fontWeight: 'bold',
  },
  imgLogo: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },  
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