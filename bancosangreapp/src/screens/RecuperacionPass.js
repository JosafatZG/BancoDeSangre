import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const RecuperacionPass = ({ navigation }) => {  
  return (
    <>
      <View style={styles.contenedorimg}>      
        <Image 
          style = {styles.img}
          source={require('../img/candado.png')}
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
          />
          <TouchableHighlight 
            style = {styles.btn}              
          >            
            <Text>Aceptar</Text>
          </TouchableHighlight>

        </View>
        <View style = {styles.cartas}>
          <Text style = {styles.tituloCarta}>Ingrese el código enviado</Text>
          <TextInput             
            style = {styles.cajaTexto}
            placeholder='Ingrese código'
            placeholderTextColor= 'white'
          />
          <TouchableHighlight 
            style = {styles.btn}
            onPress={() => navigation.navigate('Cambio de contraseña')} 
          >            
            <Text>Aceptar</Text>
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
    backgroundColor: '#F1025E',
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
  }

});
