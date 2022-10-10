import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const CambioPass = () => {
  return (
    <>
      <View style = {styles.contenedorimg}>
				<Image 
					style = {styles.img}
          source={require('../img/candado2color2.png')}
				/>
			</View>
			<View style = {styles.cartas}>
				<View>
					<Text style = {styles.titulo}>Escriba su nueva contraseña</Text>
					<View>
						<TextInput             
							style = {styles.cajaTexto}
							placeholder='Ingrese nueva contraseña'
							placeholderTextColor= 'white'
							secureTextEntry = {true}
						/>
					</View>
				</View>
				<View>
					<View>
						<Text style = {styles.titulo2}>Escriba su nueva contraseña</Text>
							<TextInput             
								style = {styles.cajaTexto}
								placeholder='Ingrese nueva contraseña'
								placeholderTextColor= 'white'
								secureTextEntry = {true}
							/>
					</View>		
				</View>
					<TouchableHighlight
              onPress={() => alert('Cambio de contraseña exitoso')}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>Cambiar contraseña</Text>
              </View>
          </TouchableHighlight>
			</View>
    </>
  )
}

const styles = StyleSheet.create({
  contenedorimg: {    
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 50,
  },
  img: {
    height: 150,
    width: 150   
  },
  cartas: {
    backgroundColor: '#C43B58',
    height: 300,
    margin: 15,
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
  titulo: {
    fontSize: 25,
    color: '#ffffff',
    marginTop: 10,		
  },
	titulo2: {
    fontSize: 25,
    color: '#ffffff',
    marginTop: 30,		
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
    borderRadius: 10,
		marginTop:30
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
		marginTop: 30
  },
});
