import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import customConfig from '../../custom-config.json';

export const RecuperacionPass = ({ navigation }) => {  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const sendCode = async () => {
    if(!validateEmail(email)){
      Alert.alert('Advertencia', 'Debes ingresar un correo electrónico válido');
    }
    else{
      const url =
        customConfig.apiURL + "Usuarios/SendConfirmationNumber?" + new URLSearchParams({
          correo: email
        });
      try {
        await fetch(url)
          .then(async function (response) {
            if(response.status == 500){ //connection lost
              Alert.alert('Error', 'Intente de nuevo');
            }
            else{
              Alert.alert('Revisa tu correo', 'Se ha enviado un código de confirmación a tu correo');
            }
          }).then(function (data) {
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const verifyCode = async () => {
    if(!validateEmail(email)){
      Alert.alert('Advertencia', 'Debes ingresar un correo electrónico válido');
    }
    else{
      const url =
        customConfig.apiURL + "Usuarios/CheckConfirmationNumber?" + new URLSearchParams({
          correo: email,
          codigoRecuperacion: code
        });
      try {
        await fetch(url)
          .then(async function (response) {
            if(response.status == 500){ //connection lost
              Alert.alert('Error', 'Intente de nuevo');
            }
            else{
              var responseJ = await response.json();
              if(responseJ){
                navigation.navigate('Cambio de contraseña', {
                  email: email,
              })
              }
              else{
                Alert.alert('Error', 'Código inválido');
              }
            }
          }).then(function (data) {
            //console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <View style={styles.contenedorimg}>      
        <Image 
          style = {styles.img}
          source={require('../img/candado1color2.png')}
        />
      </View>
      <View>
        <View style = {styles.cartas}>
          <Text style = {styles.tituloCarta}>Ingrese su correo electrónico</Text>
          <TextInput 
            keyboardType='email-address'
            style = {styles.cajaTexto}
            placeholder='Ingrese correo electrónico '
            placeholderTextColor= 'white'
            onChangeText={(value) => setEmail(value)}
          />
          <TouchableHighlight onPressOut={() => {sendCode()}}>
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>Aceptar</Text>
            </View>
          </TouchableHighlight>

        </View>
        <View style = {styles.cartas}>
          <Text style = {styles.tituloCarta}>Ingrese el código enviado</Text>
          <TextInput             
            style = {styles.cajaTexto}
            placeholder='Ingrese código'
            placeholderTextColor= 'white'
            onChangeText={(value) => setCode(value)}
          />
            <TouchableHighlight
              onPress={() => verifyCode()}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>Ingresar</Text>
              </View>
            </TouchableHighlight>
        </View>
      </View>
    </>      
  )
}

const styles = StyleSheet.create({
  contenedorimg: {    
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 50   
  },
  img: {
    height: 150,
    width: 150   
  },
  cartas: {
    backgroundColor: '#C43B58',
    height: 160,
    width:'97.5%',
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
  tituloCarta : {
    fontSize: 25,
    color: '#ffffff',
    marginTop: 10
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
  btn: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 15,
    width: 200,
    borderWidth: 0.5,    
    borderRadius: 10
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
    borderRadius:2
  },

});
