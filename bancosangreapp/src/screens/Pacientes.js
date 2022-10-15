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
  Alert
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import customConfig from '../../custom-config.json';

export const Pacientes = ({ navigation }) => {
  const[nombresP, setNombresP] = useState('');
  const[apellidosP, setApellidosP] = useState('');
	const[edad, setEdad] = useState('');
	const[tipo, setTipo] = useState('');
	const[rh, setRH] = useState('');
  const[gen, setGen] = useState('');

  const agregarPaciente = () => {
    const url = customConfig.apiURL + "Pacientes/?";
    var responseJ;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        nombres: nombresP,
        apellidos: apellidosP,
        generoId: gen,
        edad: edad,
        tipoSangreId: tipo,
        tipoRHId: rh

      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(async function (response) {
      if(response.status == 200 || response.status == 201){
        Alert.alert('Éxito', 'Paciente agregado correctamente');
          responseJ = await response.json;
      }
      else if(response.status == 500){
        Alert.alert('Error', 'Intente de nuevo');
      }
      else{
        Alert.alert('Error', 'Intente más tarde');
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
      <View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombres:</Text>
          <TextInput
            keyboardType="default"
            placeholder="Ejemplo: Harry Edward"
            placeholderTextColor={"white"}
            style={styles.cardText}
            onChangeText={(value) => setNombresP(value)}	
          />
          <Text style={styles.cardTitle}>Apellidos:</Text>
          <TextInput
            keyboardType="default"
            placeholder="Ejemplo: Styles"
            placeholderTextColor={"white"}
            style={styles.cardText}
            onChangeText={(value) => setApellidosP(value)}
          />
          <Text style={styles.cardTitle}>Edad:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Ejemplo: 27"
            placeholderTextColor={"white"}
            style={styles.cardText}
            onChangeText={(value) => setEdad(value)}
          />
          <Text style={styles.cardTitle}>Género</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el género", value: null }}
            items={[
              { label: "F", value: 2 },
              { label: "M", value: 1 },
              { label: "NR", value: 4 },
              { label: "O", value: 3 },
            ]}
            onValueChange = {(value=>setGen(value))}
          />
          <Text style={styles.cardTitle}>Tipo de sangre:</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de sangre", value: null }}
            items={[
              { label: "A", value: 2 },
              { label: "B", value: 3 },
              { label: "O", value: 4 },
              { label: "AB", value: 1 },
            ]}
            onValueChange = {(value=>setTipo(value))}
          />
          <Text style={styles.cardTitle}>Tipo RH:</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de RH", value: null }}
            items={[
              { label: "Positivo", value: 1 },
              { label: "Negativo", value: 2 },
            ]}
            onValueChange = {(value=>setRH(value))}
          />
          <TouchableHighlight
            onPress={() => agregarPaciente()}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.button}>Agregar paciente</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C43B58",
    height: 650,
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
  cardPicker: {
    borderRadius: 10,
    borderColor: "white",
    height: 40,
    width: 350,
  },
  button: {
    fontSize: 20,
    color: "#C43B58",
    fontWeight: "bold",
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 2,
  },
});

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
