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
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export const Pacientes = ({ navigation }) => {
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
          />
          <Text style={styles.cardTitle}>Apellidos:</Text>
          <TextInput
            keyboardType="default"
            placeholder="Ejemplo: Styles"
            placeholderTextColor={"white"}
            style={styles.cardText}
          />
          <Text style={styles.cardTitle}>Edad:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Ejemplo: 27"
            placeholderTextColor={"white"}
            style={styles.cardText}
          />
          <Text style={styles.cardTitle}>Género</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el género", value: null }}
            items={[
              { label: "F", value: "F" },
              { label: "M", value: "M" },
              { label: "NR", value: "NR" },
              { label: "O", value: "O" },
            ]}
          />
          <Text style={styles.cardTitle}>Tipo de sangre:</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de sangre", value: null }}
            items={[
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "O", value: "O" },
              { label: "AB", value: "AB" },
            ]}
          />
          <Text style={styles.cardTitle}>Tipo RH:</Text>
          {/**onValueChange={(value)=>setGenre(value)} ADENTRO DEL RNPICKER*/}
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Seleccione el tipo de RH", value: null }}
            items={[
              { label: "Positivo", value: "Positivo" },
              { label: "Negativo", value: "Negativo" },
            ]}
          />
          <TouchableHighlight
            onPress={() => alert("Registro de paciente realizado ")}
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
