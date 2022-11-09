import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import customConfig from "../../custom-config.json";

export const CardBolsaTransf = ({
  navigation,
  donante,
  cantidad,
  fechaD,
  tipoSangre,
  tipoRH,
  id, 
  tipoBolsa,
  receptor,
  fechaA
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreD, setNombreD] = useState("");
  const [apellidoD, setApellidoD] = useState("");
  const [nombreA, setNombreA] = useState("");
  const [apellidoA, setApellidoA] = useState("");
  const [tipoRHID, setTipoRHID] =  useState("");
  const [tipoSangreID, setTipoSangreID] =  useState("");
  const [nombreTipoBolsa, setNombreTipoBolsa] = useState("");
  const [nombreTipoSangre, setNombreTipoSangre] = useState("");
  const [nombreTipoRH, setNombreTipoRH] = useState("");

  var responseJ, responseJ2, responseJ3;  

  //Obtener datos de un donante en específico 
  axios({
    url: customConfig.apiURL + "Pacientes/" + donante,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreD(response.data["nombres"]);
    setApellidoD(response.data["apellidos"]);
    setTipoSangreID(response.data["tipoSangreId"]);
    setTipoRHID(response.data["tipoRHId"]);
  });

    //Obtener datos de un receptor en específico 
    axios({
      url: customConfig.apiURL + "Pacientes/" + receptor,
      method: "GET",
    }).then(async (response) => {
      responseJ = await response.json;
      setNombreA(response.data["nombres"]);
      setApellidoA(response.data["apellidos"]);
    });
  

  //Obtener el nombre del tipo de bolsa por id
  axios({
    url: customConfig.apiURL + "TipoBolsas/" + tipoBolsa,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreTipoBolsa(response.data["tipo"]);
  });
  
  //Obtener el nombre del tipo de sangre por id
  axios({
    url: customConfig.apiURL + "TipoSangre/" + tipoSangreID,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreTipoSangre(response.data["nombreTS"]);
  });

  axios({
    url: customConfig.apiURL + "TipoRH/" + tipoRHID,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreTipoRH(response.data["nombreRH"]);
  });

  return (
    <>
      <ScrollView>
        <View style={styles.cartaDonante}>
          <TouchableHighlight onPress={() => setModalVisible(true)}>
            <View>
              <Text style={styles.informacion}>
                Donante: {nombreD} {apellidoD}
              </Text>
              <Text style={styles.informacion}>Cantidad ml: {cantidad}</Text>
              <Text style={styles.informacion}>
                Fecha de donación: {fechaD}
              </Text>
              <Text style={styles.informacion}>Tipo de bolsa: {nombreTipoBolsa}</Text>
              <Text style={styles.informacion}>Tipo de sangre: {nombreTipoSangre}</Text>
              <Text style={styles.informacion}>Tipo de RH: {nombreTipoRH}</Text>
              <Text style={styles.informacion}>
                Recpetor: {nombreA} {apellidoA}
              </Text>
              <Text style={styles.informacion}>
                Fecha de transfusión: {fechaA}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>      
    </>
  );
};

const styles = StyleSheet.create({
  cajaTexto: {
    height: 40,
    width: 370,
    borderWidth: 2,
    padding: 10,
    color: "#C43B58",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
    marginTop: 20,
  },
  contenedorBuscador: {
    alignItems: "center",
  },
  cartaDonante: {
    backgroundColor: "#C43B58",
    height: 350,
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  contenedorContenido: {
    height: 150,
    margin: 20,
    height: 160,
  },
  informacion: {
    margin: 10,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  informacion2: {
    marginLeft: 10,
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 500,
    width: 350,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  informacionModal: {
    fontSize: 19,
    color: "#C43B58",
    marginTop: 10,
  },
  cajaTextoModal: {
    height: 40,
    width: 300,
    borderWidth: 2,
    padding: 10,
    color: "#C43B58",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
    marginTop: 10,
  },
  contenedorForm: {
    backgroundColor: "white",
    height: 400,
    width: 320,
  },
  contenedorInfo: {
    margin: 10,
  },
  contenedorBtnModal: {
    /*backgroundColor: 'blue',
		width: 300*/
  },
  button2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    padding: 8,
    backgroundColor: "#C43B58",
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    //backgroundColor: "blue",
    borderRadius: 10,
    flexDirection: "row",
  },
  txtBtnModal: {
    color: "white",
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    width: 300,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
    // marginLeft: 15,
    color: "#C43B58",
  },
  inputAndroid: {
    height: 40,
    width: 300,
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
    // marginLeft: 15,
    color: "#C43B58",
  },
});
