import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView ,Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import  { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const Donacion = () => {
  const[modalVisible , setModalVisible] = useState(false);

  return (
    <>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fecha de donación:</Text>
          <RNDateTimePicker mode='date' style={styles.datePickerStyle}
            format="DD-MM-YYYY"
            value={new Date()}
            display="calendar"
            themeVariant="dark"
            accentColor='lightblue'
          />
          <Text style={styles.cardTitle}>Tipo de bolsa:</Text>
          {/**CUANDO YA VAYAN A PROGRAMAR quitenle el comenario */}
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de bolsa", value: null }}
            items={[
              { label: "Plaquetas", value: "Plaquetas" },
              { label: "Plasma", value: "Plasma" },
              { label:"Sangre", value:"Sangre"}
            ]}
          />
          <Text style={styles.cardTitle}>Cantidad:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Ejemplo: 2"
            placeholderTextColor={"white"}
            style={styles.cardText}
          />
          <Text style={styles.cardTitle}>Donante:</Text>
          <Text style={styles.cardTitle2}>Antonio Merino</Text>
          <TouchableHighlight
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.buttonContainer2}>
              <Text style={styles.button2}>Seleccionar donante</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight
            onPress={() => alert("Registro de bolsa realizado ")}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>Agregar paciente</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/**MODAL */}

        <Modal animationType='slide' visible = {modalVisible} onRequestClose = {() => setModalVisible(!modalVisible)}>
			    <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.cajaTitulo}>Seleccionar Donante</Text>
              <View style= {styles.contenedorBuscador}>
                <TextInput             
                style = {styles.cajaTexto}							
                placeholder='Ingrese usuario para buscar'
                placeholderTextColor= '#C43B58'										
                />
              </View>
              <View style = {styles.cartaPaciente}>
                <View style = {styles.contenedorContenido}>
                  <Text style = {styles.informacion}>Paciente: Antonio Merino</Text>
                  <Text style = {styles.informacion2}>Tipo de sangre: A</Text>
                  <Text style = {styles.informacion}>Tipo de RH: Negativo</Text>
                  <TouchableHighlight
                     onPress={() => alert("Paciente seleccionado")}
                  >
                    <View style={styles.buttonContainerCard}>
                      <Text style={styles.buttonCard}>Seleccionar</Text>
                    </View>
                  </TouchableHighlight>
                </View>
				      </View>
              <View style = {styles.buttonContainer2}>	
                <TouchableHighlight
                  style = {styles.button2}
                  onPress = {() => setModalVisible(!modalVisible)}
                >
                  <Text style = {styles.txtBtnModal}>Cerrar</Text>
                </TouchableHighlight>						
						</View>	
          </View>
        </View>
			</Modal>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C43B58",
    height: 550,
    width: "97.5%",
    margin: 5,
    borderRadius: 14,
    alignItems: "center",
    shadowRadius: 2,
    shadowColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    marginTop:50
  },
  cardTitle: {
    fontSize: 25,
    color: "#ffffff",
    marginTop: 10,
  },
  cardText: {
    height: 40,
    width: 350,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    color: "white",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "white",
  },
  button: {
    fontSize: 20,
    color: "#C43B58",
    fontWeight: "bold",
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
		height: 500,
		width: 350
  },
  contenedorBuscador : {
		alignItems: 'center'
	},
  cajaTexto : {
    height: 40,
    width: 330,    
    borderWidth: 2,
    padding: 10,
    color: '#C43B58',
    fontSize: 15,  
    borderRadius: 10,
    borderColor: '#C43B58', 
		marginTop: 15 
  },
  cajaTitulo: {
    fontSize: 20,
    color: "#C43B58",
    marginTop: 0,
    fontWeight:'bold'
  },
  cartaPaciente : {
		backgroundColor: '#C43B58',
		height: 190,
    width:300,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
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
	},
  contenedorContenido: {		
		height: 150,
		margin: 20,
		height: 160
	},
	informacion: {
		margin: 10,
		color: 'white',
		fontSize: 19,
		fontWeight: 'bold'
	},
	informacion2: {
		marginLeft: 10,
		color: 'white',
		fontSize: 19,
		fontWeight: 'bold',		
	},
  buttonCard: {
    fontSize: 15,
    color: "#C43B58",
    fontWeight: "bold",
    padding: 9,
    textAlign:'center'
  },
  buttonContainerCard: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 2,
    width:110,
    alignItems:'right',
  },
  button2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: 8,	
		backgroundColor: '#C43B58',
		borderRadius: 10,
		marginLeft: 10,				
  },
  buttonContainer2: {
    //backgroundColor: "blue",
    borderRadius: 10,
		flexDirection: 'row'	,			
		marginTop:30,
  },
  txtBtnModal: {
		color: 'white',
		fontWeight: 'bold',
    fontSize:15,
    padding:4
	},
  button2: {
    fontSize: 20,
    color: "white",
    padding: 8,
  },
  buttonContainer2: {
    backgroundColor: "#C43B58",
    marginTop: 10,
    borderRadius: 10,
    borderColor:'white',
    borderWidth:2
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
    borderColor:'white',
    borderWidth:2,
    borderRadius:10,
    height:40,
    alignItems:'center',
    alignContent:'center',

  },
  cardTitle2: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
    fontWeight:'bold'
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: 350,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "white",
    marginLeft: 15,
    color: "white",
  },
  inputAndroid: {
    height: 40,
    width: 350,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    color: "white",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "white",
    marginLeft: 15,
  },

});
