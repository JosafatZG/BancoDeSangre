import * as React from "react";
import {Button,View,Text,StyleSheet, Image,TextInput,TouchableHighlight,ScrollView,picker,Alert} from "react-native";
import { useState } from "react";
import customConfig from '../../custom-config.json'
import { Modal } from "react-native-web";
import axios from "axios";
import { useEffect } from "react";
import { CardPacientesModal } from "../components/CardPacientesModal";

export const RegistroTransfusiones = ({navigation}) => {
  const[modalVisible , setModalVisible] = useState(false);
  const[modalVisible2 , setModalVisible2] = useState(false);
  const[listR, setListaR] = useState([]);
  const[receptorId, setReceptorId] = useState();

  const getListaReceptor = () => {
    var responseJ;
    axios({
      url: customConfig.apiURL + "Pacientes/?",
      method: 'GET'
    }).then(async (response) => {
      responseJ = await response.json 
      setListaR(response.data)
    })
  }

  const getListaBolsa = () => {
    var responseJ2;
    axios({
      url: customConfig.apiURL + "Bolsas/?",
      method: 'GET'
    }).then(async (responde) => {
      responseJ2 = await responde.json
      setListaB(responde.data)
    })
  }

  useEffect(() => {
    getListaReceptor();
    getListaBolsa();
  })

    return(
        <>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Receptor de bolsa:</Text>
                    <TouchableHighlight onPress={()=>setModalVisible(true)}>
                      <View style={styles.buttonContainer2}>
                        <Text style={styles.button2}>Seleccionar receptor</Text>
                      </View>
                    </TouchableHighlight>
                    <Text style={styles.cardTitle}>Bolsa de donación:</Text>
                    <TouchableHighlight onPress={()=>setModalVisible2(true)}>
                      <View style={styles.buttonContainer2}>
                        <Text style={styles.button2}>Seleccionar bolsa</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                      <View style={styles.buttonContainer}>
                        <Text style={styles.button}>Agregar transfusión</Text>
                      </View>
                    </TouchableHighlight>
                </View>

                {/**MODAL DE RECEPTORES */}
          <Modal animationType='slide' visible = {modalVisible} onRequestClose = {() => setModalVisible(!modalVisible)}>
			    <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.cajaTitulo}>Seleccionar Receptor</Text>
              <View style= {styles.contenedorBuscador}>
                <TextInput             
                style = {styles.cajaTexto}							
                placeholder='Ingrese paciente/receptor para buscar'
                placeholderTextColor= '#C43B58'										
                />
              </View>
              <ScrollView>				
					{	
						
						listR.map((item,index)=> {
							return(
								<View key={index} >
									<CardPacientesModal
										navigation={navigation}
										nombre={item.nombres}
										apellido={item.apellidos}
										tipoSangre={item.tipoSangreId}
										tipoRH={item.tipoRHId}
                    id={item.id}
                    setDonanteId = {setReceptorId}
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
    );
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
  cardTitle2: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
    fontWeight:'bold'
  },
})