import React from "react";
import { View, ScrollView, Text ,Image, TextInput} from "react-native";

export default function Login(){
    return(
        <View>
            <View>
                <Image source={require('')}/>
            </View>
            <View>
                <Text>Usuario</Text>
                <TextInput/>
                <Text>Contraseña</Text>
                <TextInput/>
            </View>
        </View>
    );
}