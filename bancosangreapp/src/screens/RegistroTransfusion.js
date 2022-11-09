import * as React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  picker,
  Alert,
  Modal,
} from "react-native";
import { useState } from "react";
import customConfig from "../../custom-config.json";
//import { Modal } from "react-native-web";
import axios from "axios";
import { useEffect } from "react";
import { CardPacientesModal } from "../components/CardPacientesModal";
import { CardDonanteReceptor } from "../components/CardDonanteReceptor";
import { CardPacientes } from "../components/CardPacientes";
import { CardBolsas } from "../components/CardBolsa";
import { CardBolsasModal } from "../components/CardBolsaModal";
//import { CardPacientesModal } from "../components/CardPacientesModal";

export const RegistroTransfusiones = ({ navigation }) => {
  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleReceptor, setModalVisibleReceptor] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [bolsasId, setBolsasId] = useState("");
  const [receptorId, setReceptorId] = useState("");
  const [bolsaInfo, setBolsaInfo] = useState("");
  const [apellidoDonante, setApellidoDonante] = useState("");
  const [nombreReceptor, setNombreReceptor] = useState("");
  const [apellidoReceptor, setApellidoReceptor] = useState("");
  const [bolsas, setBolsas] = useState([]);
  const [tipoBolsa, setTipoBolsa] = useState([]);

  const getPacientes = () => {
    var responseJ;
    axios({
      url: customConfig.apiURL + "Pacientes/",
      method: "GET",
    }).then(async (response) => {
      responseJ = await response.json;
      setPacientes(response.data);
    });
  };

  const getBolsas = () => {
    var responseJ;
    axios({
      url: customConfig.apiURL + "Bolsas/?",
      method: 'GET'
    }).then(async (response) => {
      responseJ = await response.json
      var bolsas = response.data;
      bolsas = bolsas.filter(b => b.receptorId == null);
      setBolsas(bolsas)
    })
  }

  const editarBolsa = () => {
    if (bolsasId == '' || receptorId == '') {
      Alert.alert("Error", "Debe elegir una bolsa y un recpetor");
    } else {
      var date = new Date();
      const bToUpdate = bolsas.find(b => b.id == bolsasId);
      bToUpdate.receptorId = receptorId;
      bToUpdate.fechaAplicacion = date.getFullYear() + "-" + pad((date.getMonth() + 1), 2) + "-" + pad(date.getDate(), 2);
      const url = customConfig.apiURL + "Bolsas/" + bolsasId;
      fetch(url,
        {
          method: 'PUT',
          body: JSON.stringify(bToUpdate),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(async function (response) {
          console.log(response.status)
          if (response.status == 200 || response.status == 201) { //finded
            Alert.alert('Éxito', 'Transfusion realizada exitosamente');
            navigation.dispatch('Registro de transfusiones')
            navigation.navigate('Registro de transfusiones')
          }
          else if (response.status == 500) { //connection lost
            Alert.alert('Error', 'Intente de nuevo');
          }
          else { //error
            Alert.alert('Error', 'Intente más tarde');
          }
        }).then(function (data) {
          console.log(data);
        }).catch(function (error) {
          console.log(error);
        })
    }
  }


  useEffect(() => {
    if (bolsasId == "") {
      setBolsaInfo("No hay seleccion.");
    } else {
      var b = bolsas.find(b => b.id == bolsasId);
      if (b != undefined) {
        var tb = tipoBolsa.find(t => t.id == b.tipoBolsaId);
        if (tb != undefined) {
          setBolsaInfo(tb.tipo);
        }
      }
    }
  }, [bolsasId]);

  useEffect(() => {
    if (receptorId == "") {
      setNombreReceptor("--");
    } else {
      var responseJ;
      axios({
        url: customConfig.apiURL + "Pacientes/" + receptorId,
        method: "GET",
      }).then(async (response) => {
        responseJ = await response.json;
        setNombreReceptor(response.data["nombres"]);
        setApellidoReceptor(response.data["apellidos"]);
      });
    }
  }, [receptorId]);

  useEffect(() => {
    getPacientes();
    getBolsas();
    axios({
      url: customConfig.apiURL + "TipoBolsas/",
      method: "GET",
    }).then(async (response) => {
      var responseJ = await response.json;
      setTipoBolsa(response.data);
    });
  }, []);

  return (
    <>
      <View style={styles.card}>
        <View style={styles.contendorBotones}>
          <View>
            <Text style={styles.leyenda}>Seleccione bolsa</Text>
            <TouchableHighlight onPress={() => setModalVisible(true)}>
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>Seleccionar bolsa</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.leyenda}>Seleccione receptor</Text>
            <TouchableHighlight onPress={() => setModalVisibleReceptor(true)}>
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>Seleccionar receptor</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={styles.leyenda}>Bolsa seleccionada:</Text>
            <Text style={styles.leyenda}>
              {bolsaInfo}
            </Text>
          </View>
          <View>
            <View>
              <Text style={styles.leyenda}>Receptor seleccionado:</Text>
              <Text style={styles.leyenda}>
                {
                  receptorId == '' || receptorId == null ?
                    "No hay seleccion."
                    :
                    (pacientes.find(p => p.id == receptorId).nombres + " " + pacientes.find(p => p.id == receptorId).apellidos)
                }
              </Text>
            </View>
            <TouchableHighlight onPress={() => editarBolsa()}>
              <View style={styles.buttonContainer}>
                <Text style={styles.button}>Guardar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      {/*Modal para seleccionar donante */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitulo}>Seleccione bolsa</Text>
            <View style={styles.contenedorDonates}>
              <ScrollView>
                {bolsas.map((item, index) => {
                  return (
                    <View key={index}>
                      <CardBolsasModal
                        navigation={navigation}
                        donante={item.donanteId}
                        cantidad={item.cantidadml}
                        fechaD={item.fechaDonacion}
                        id={item.id}
                        tipoBolsa={item.tipoBolsaId}
                        tipoSangre={item.tipoSangreId}
                        tipoRH={item.tipoRHId}
                        setBolsaId={setBolsasId}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.buttonContainerModal}>
                <Text style={styles.buttonModal}>Cerrar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/*Modal para seleccionar receptor */}
      <Modal
        animationType="slide"
        visible={modalVisibleReceptor}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisibleReceptor);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitulo}>Seleccione receptor</Text>
            <View style={styles.contenedorDonates}>
              <ScrollView>
                {
                  pacientes.map((item, index) => {
                    return (
                      <View key={index}>
                        <CardPacientesModal
                          nombre={item.nombres}
                          apellido={item.apellidos}
                          tipoSangre={item.tipoSangreId}
                          tipoRH={item.tipoRHId}
                          id={item.id}
                          setDonanteId={setReceptorId}
                          setModalVisible={setModalVisibleReceptor}
                          modalVisible={modalVisibleReceptor}
                        />
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            <TouchableHighlight
              onPress={() => setModalVisibleReceptor(!modalVisibleReceptor)}
            >
              <View style={styles.buttonContainerModal}>
                <Text style={styles.buttonModal}>Cerrar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C43B58",
    height: 570,
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
    marginTop: 50,
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
    alignContent: "center",
    borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 2,
  },
  /*centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },*/
  /* modalView: {
    margin: 110,
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
  },*/
  contenedorBuscador: {
    alignItems: "center",
  },
  cajaTexto: {
    height: 40,
    width: 330,
    borderWidth: 2,
    padding: 10,
    color: "#C43B58",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "#C43B58",
    marginTop: 15,
  },
  cajaTitulo: {
    fontSize: 20,
    color: "#C43B58",
    marginTop: 0,
    fontWeight: "bold",
  },
  cartaPaciente: {
    backgroundColor: "#C43B58",
    height: 190,
    width: 300,
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
  buttonCard: {
    fontSize: 15,
    color: "#C43B58",
    fontWeight: "bold",
    padding: 9,
    textAlign: "center",
  },
  buttonContainerCard: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 2,
    width: 110,
    alignItems: "right",
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
  buttonContainer2: {
    //backgroundColor: "blue",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 20,
  },
  txtBtnModal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    padding: 4,
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
    borderColor: "white",
    borderWidth: 2,
  },
  cardTitle2: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 10,
    fontWeight: "bold",
  },
  contendorBotones: {
    height: 300,
    width: 350,
    margin: 90,
  },
  leyenda: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 25,
    color: "white",
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
    height: 700,
    width: 380,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalTitulo: {
    color: "#C43B58",
    fontSize: 25,
  },
  buttonContainerModal: {
    backgroundColor: "#C43B58",
    borderRadius: 10,
  },
  buttonModal: {
    color: "white",
    fontWeight: "bold",
    padding: 8,
    alignContent: "center",
    borderRadius: 15,
    fontSize: 20,
  },
  contenedorDonates: {
    height: 550,
    width: 300,
    marginTop: 10,
    //backgroundColor: 'blue'
  },
});
