import * as React from "react";
import {Button,View,Text,StyleSheet, Image,TextInput,TouchableHighlight,ScrollView,picker,Alert} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import customConfig from '../../custom-config.json';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const Pacientes = ({ navigation }) => {
  const[nombresP, setNombresP] = useState('');
  const[apellidosP, setApellidosP] = useState('');
	const[tipo, setTipo] = useState('');
	const[rh, setRH] = useState('');
  const[gen, setGen] = useState('');
  const[fechaNacimiento, setFechaNacimiento] = useState('');


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
      const opciones = { year: 'numeric', month: '2-digit', day: "2-digit" };
      setFechaNacimiento(date.toLocaleDateString('fr-CA', opciones));
      //setFechaNacimiento('2022-10-25T02:55:45.490Z');
      hideDatePicker();
      };

  const agregarPaciente = () => {   
    const url = customConfig.apiURL + "Pacientes/?";
    var responseJ;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        nombres: nombresP,
        apellidos: apellidosP,
        fechaNac: fechaNacimiento,  
        generoId: gen,
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
          <Text style={styles.cardTitle}>Fecha de nacimiento:</Text>
          <View>
          <TouchableHighlight onPress={showDatePicker}>
            <View style={styles.buttonContainer2}>
              <Text style={styles.button2}>Seleccionar fecha de nacimiento</Text>
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
            date={fechaNacimiento ? new Date(fechaNacimiento) : undefined}
            minimumDate={new Date('2004-01-01')}
            maximumDate={new Date('1957-01-01')}    
          />
          <Text style={styles.textDate}>Fecha seleccionada: {fechaNacimiento}</Text>
          </View>

          <Text style={styles.cardTitle}>Género</Text>
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
    height: 750,
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
  datePickerStyle: {
    width: 300,
    marginTop: 20,
    borderColor:'white',
    borderWidth:2,
    borderRadius:10,
    height:150,
    alignItems:'center',
    alignContent:'center',

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
