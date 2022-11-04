import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView ,Modal, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import  { useState } from 'react'
import customConfig from '../../custom-config.json';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect } from 'react';
import axios from 'axios';
import { CardPacientesModal } from '../components/CardPacientesModal';

export const Donacion = (navigation,id) => {
  const[fechaDonacion, setFechaDonacion] = useState('');
  const[fechaAplicacion, setAplicacion] = useState('');
  const[tipoBolsaId, setTipoBolsa] = useState();
  const[cantidadMl, setCantidadMl] = useState();
  const[donanteId, setDonanteId] = useState();
  const[receptorId, setReceptorId] = useState();  
  const[modalVisible , setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //const[fechaAplicacion, setAplicacion] = useState('');

  //para modal pacientes
  const[list, setList] = useState([]);

  const getList = () => {
		var responseJ;
		axios({
			url: customConfig.apiURL + "Pacientes/?",
			method: 'GET'
		}).then(async (response) => {
			responseJ = await response.json			
			setList(response.data)			
		})
    
	}
	useEffect(() => {
		getList();
	})

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
      const opciones = { year: 'numeric', month: '2-digit', day: "2-digit" };
      setFechaDonacion(date.toLocaleDateString('fr-CA', opciones));
      //setFechaNacimiento('2022-10-25T02:55:45.490Z');
      hideDatePicker();
      };

  const agregarDonacion = () => {
   
    const urlAgregar = customConfig.apiURL + "Bolsas/?";
    var responseJ;
    fetch(urlAgregar, {
      method: 'POST',
      body: JSON.stringify({
        tipoBolsaId: tipoBolsaId,
        cantidadml: cantidadMl,
        donanteId: donanteId,          
        fechaDonacion: fechaDonacion,       
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(async function (response) {
      if(response.status == 200 || response.status == 201){
        Alert.alert('Éxito', 'Bolsa agregada correctamente');
          responseJ = await response.json;          
      }
      else if(response.status == 500){
        Alert.alert('Error', 'Intente de nuevo');
      }
      else{
        Alert.alert('Error', 'Intente más tarde');
        alert(response.status)
      }
      return Promise.reject(JSON.stringify(response));
    }).then(function (data){
      console.log(data);
    }).catch(function (error){
      console.log(error);
    });
  }

  return (
    <>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fecha de donación:</Text>
          <View>
          <TouchableHighlight onPress={showDatePicker}>
            <View style={styles.buttonContainer2}>
              <Text style={styles.button2}>Seleccionar fecha de donación</Text>
            </View>
          </TouchableHighlight>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale='es-ES'
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"   
            style = {styles.inputIOSDate}    
            isDarkModeEnabled= 'true'     
          />
          <Text style={styles.textDate}>{fechaDonacion}</Text>
          </View>
          <Text style={styles.cardTitle}>Tipo de bolsa:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de bolsa", value: null }}
            items={[
              { label: "Plaquetas", value: 3 },
              { label: "Plasma", value: 2 },
              { label:"Sangre", value: 1}
            ]}
            onValueChange = {(value)=>setTipoBolsa(value)}
          />
          <Text style={styles.cardTitle}>Cantidad ml:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Ejemplo: 200 ml"
            placeholderTextColor={"white"}
            style={styles.cardText}  
            onChangeText ={(value)=>setCantidadMl(value)}          
          />
          <Text style={styles.cardTitle}>Donante:</Text>
          <Text style={styles.cardTitle2}></Text>
          <TouchableHighlight
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.buttonContainer2}>
              <Text style={styles.button2}>Seleccionar donante</Text>
            </View>
          </TouchableHighlight>
  
          <TouchableHighlight
            onPress={() => agregarDonacion()}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>Agregar bolsa</Text>
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
                placeholder='Ingrese donante para buscar'
                placeholderTextColor= '#C43B58'										
                />
              </View>
              <ScrollView>				
					{	
						
						list.map((item,index)=> {
							return(
								<View key={index} >
									<CardPacientesModal
										navigation={navigation}
										nombre={item.nombres}
										apellido={item.apellidos}
										tipoSangre={item.tipoSangreId}
										tipoRH={item.tipoRHId}
                    id={item.id}
                    setDonanteId = {setDonanteId}
                    setModalVisible = {setModalVisible}
                    modalVisible = {modalVisible}
									/> 
								</View>
							)
						})				
					}				
			</ScrollView>
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
    margin:110,
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
		height: 600,
		width: 370
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
		marginTop:20,
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
  inputIOSDate: {
    height: 150,
    width: 350,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    marginLeft: 15,
    color: "black",
  },
  textDate:{
    color: 'white',
    fontWeight:'bold',
    fontSize:17,
    marginTop:5
  }
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
