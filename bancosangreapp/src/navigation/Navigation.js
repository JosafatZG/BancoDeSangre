import React from "react";
import {Login} from '../screens/Login';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login} options={{title:'Home'}}/>
        </Stack.Navigator>
    );
}

