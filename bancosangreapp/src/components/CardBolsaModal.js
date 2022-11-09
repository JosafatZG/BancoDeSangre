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

export const CardBolsasModal = ({
  navigation,
  id,
  donante,
  cantidad,
  fechaD,
  tipoBolsa,
  setModalVisible,
  modalVisible,
  setBolsaId
}) => {
  const [pacientes, setPacientes] = useState([]);
  const [tipoBolsaL, setTipoBolsaL] = useState([]);
  const [tipoSangreL, setTipoSangreL] = useState([]);
  const [tipoRHL, setTipoRHL] = useState([]);

	useEffect(() => {
    axios({
      url: customConfig.apiURL + "Pacientes/",
      method: "GET",
    }).then(async (response) => {
      var responseJ = await response.json;
      setPacientes(response.data);
    });
    axios({
      url: customConfig.apiURL + "TipoBolsas/",
      method: "GET",
    }).then(async (response) => {
      var responseJ = await response.json;
      setTipoBolsaL(response.data);
    });
    axios({
      url: customConfig.apiURL + "TipoSangre/",
      method: "GET",
    }).then(async (response) => {
      var responseJ = await response.json;
      setTipoSangreL(response.data);
    });
  
    axios({
      url: customConfig.apiURL + "TipoRH/",
      method: "GET",
    }).then(async (response) => {
      var responseJ = await response.json;
      setTipoRHL(response.data);
    });
	}, [])

  const getTS = (id) => {
    var pc = pacientes.find(ts => ts.id == donante);
    if (pc != undefined) {
      var ts = tipoSangreL.find(ts => ts.id == pc.tipoSangreId);
      if (ts != undefined)
        return ts.nombreTS;
      else
        return ""
    }
    return ""
  }

  const getTSRH = (id) => {
    var pc = pacientes.find(ts => ts.id == donante);
    if (pc != undefined) {
      var ts = tipoRHL.find(ts => ts.id == pc.tipoRHId);
      if (ts != undefined)
        return ts.nombreRH;
      else
        return ""
    }
    return ""
  }

  const getTipoBolsa = (id) => {
    var ts = tipoBolsaL.find(ts => ts.id == id);
    if (ts != undefined)
      return ts.tipo;
    else
      return ""
  }

  const getName = (id) => {
    var ts = pacientes.find(ts => ts.id == id);
    if (ts != undefined)
      return ts.nombres + " " + ts.apellidos;
    else
      return ""
  }

  const setBolsa = (id) => {    
		setBolsaId(id)
		setModalVisible(!modalVisible)
  }

  return (
    <>
        <View style={styles.cartaDonante}>
          <TouchableHighlight onPress={() => {setBolsa(id)}}>
            <View>
              <Text style={styles.informacion}>
                Donante: {getName(donante)}
              </Text>
              <Text style={styles.informacion}>Cantidad ml: {cantidad}</Text>
              <Text style={styles.informacion}>
                Fecha de donación: {fechaD}
              </Text>
              <Text style={styles.informacion}>Tipo de bolsa: {getTipoBolsa(tipoBolsa)}</Text>
              <Text style={styles.informacion}>Tipo de sangre: {getTS()}</Text>
              <Text style={styles.informacion}>Tipo de RH: {getTSRH()}</Text>
            </View>
          </TouchableHighlight>
        </View>
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
    height: 300,
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
