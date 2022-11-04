import React from 'react'
import { Button, View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView ,Modal, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import RNPickerSelect from "react-native-picker-select";
import  { useState } from 'react'
import customConfig from '../../custom-config.json';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect } from 'react';
import axios from 'axios';

export const DonacionBolsas = (navigation) =>{
    return(
        <View>

        </View>
    );
}