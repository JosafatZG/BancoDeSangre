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

export const CardPacientes = ({
  navigation,
  nombre,
  apellido,
  tipoSangre,
  tipoRH,
  id,
  genero,
  fechaNac,
  edad,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreTS, setNombreTS] = useState("");
  const [nombreRH, setNombreRH] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState(nombre);
  const [apellidoPaciente, setApellidoPaciente] = useState(apellido);
  const [tipoSangreUp, setTipoSangreUp] = useState(tipoSangre);
  const [tipoRHUp, setTipoRHUp] = useState(tipoRH);

  var responseJ;
  axios({
    url: customConfig.apiURL + "TipoSangre/" + tipoSangre,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreTS(response.data["nombreTS"]);
  });

  var responseJ2;
  axios({
    url: customConfig.apiURL + "TipoRH/" + tipoRH,
    method: "GET",
  }).then(async (response) => {
    responseJ = await response.json;
    setNombreRH(response.data["nombreRH"]);
  });



  const eliminarPaciente = (idEliminar) => {
    Alert.alert(
      "Advertencia",
      "¿Estas seguro de querer eliminar el paciente?",
      [
        {
          text: "Sí",
          onPress: () => {
            var responseJ;
            axios({
              url:
                customConfig.apiURL + "Pacientes/" + idEliminar,
              method: "DELETE",
            }).then(async (response) => {
              //responseJ = await response.json
              Alert.alert("Eliminado", "Paciente eliminado correctamente");
              setModalVisible(!modalVisible);
              useEffect();
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const modificarPaciente = (idP) => {
    var paciente = {
      id: idP,
      nombres: nombrePaciente,
      apellidos: apellidoPaciente,
      fechaNac: fechaNac,
      generoId: genero,
      edad: edad,
      tipoSangreId: tipoSangreUp,
      tipoRHId: tipoRHUp,
    };
    console.log(paciente);
    if (nombrePaciente == "") {
      alert("Debe de ingresar nombre");
    } else if (apellidoPaciente == "") {
      alert("Debe de ingresar apellido");
    } else {
      const url = customConfig.apiURL + "Pacientes/" + idP;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(paciente),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async function (response) {
          if (response.status == 200 || response.status == 201) {
            var responseJ;
            Alert.alert("Éxito", "Paciente actualizado correctamente");
            responseJ = await response.json;
            setModalVisible(!modalVisible);
          } else if (response.status == 500) {
            Alert.alert("Error", "Intente de nuevo");
          } else {
            Alert.alert("Error", "Intente más tarde");
          }
          return Promise.reject(JSON.stringify(response));
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.cartaPaciente}>
          <TouchableHighlight onPress={() => setModalVisible(true)}>
            <View style={styles.contenedorContenido}>
              <Text style={styles.informacion}>
                Paciente: {nombre} {apellido}
              </Text>
              <Text style={styles.informacion2}>
                Tipo de sangre: {nombreTS}
              </Text>
              <Text style={styles.informacion}>Tipo de RH: {nombreRH}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contenedorForm}>
              <View style={styles.contenedorInfo}>
                <Text style={styles.informacionModal}>Nombre:</Text>
                <TextInput
                  style={styles.cajaTextoModal}
                  placeholder={nombre}
                  placeholderTextColor="#C43B58"
                  onChangeText={(e) => setNombrePaciente(e)}
                />

                <Text style={styles.informacionModal}>Apellido:</Text>
                <TextInput
                  style={styles.cajaTextoModal}
                  placeholder={apellido}
                  placeholderTextColor="#C43B58"
                  onChangeText={(e) => {
                    setApellidoPaciente(e);
                  }}
                />

                <Text style={styles.informacionModal}>Tipo de sangre:</Text>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  placeholder={{
                    label: "Seleccione el tipo de sangre",
                    value: null
                  }}
                  value={tipoSangre}
                  items={[
                    { label: "A", value: 2 },
                    { label: "B", value: 3 },
                    { label: "O", value: 4 },
                    { label: "AB", value: 1 },
                  ]}
                  onValueChange={(value => setTipoRHUp(value))}
                />

                <Text style={styles.informacionModal}>Tipo de RH:</Text>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  placeholder={{
                    label: "Seleccione el tipo de RH",
                    value: null,
                  }}
                  value={tipoRH}
                  items={[
                    { label: "Positivo", value: 1 },
                    { label: "Negativo", value: 2 },
                  ]}
                  onValueChange={(value => setTipoSangreUp(value))}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.button2}
                onPress={() =>
                  modificarPaciente(id)
                }
              >
                <Text style={styles.txtBtnModal}>Actualizar</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button2}
                onPress={() => eliminarPaciente(id)}
              >
                <Text style={styles.txtBtnModal}>Eliminar</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.button2}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.txtBtnModal}>Cerrar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
  cartaPaciente: {
    backgroundColor: "#C43B58",
    height: 150,
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
