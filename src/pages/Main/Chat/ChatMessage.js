import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar, KeyboardAvoidingView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';
import {Ionicons} from "@expo/vector-icons";
import { ChatMessage } from '../../../Components/ChatComponent';



export default function Matchs({ navigation }) {
    // async function test (){
    //   console.log(await AsyncStorage.getItem('pet'));
    // }

    // test();

    const screenHeight = Dimensions.get('window').height + StatusBar.currentHeight;

    return (

        <KeyboardAvoidingView  style={[{flex:1, height:screenHeight},styles.container]}>
        
            <ChatMessage/>
        
        </KeyboardAvoidingView >
    );
  }

  const styles = StyleSheet.create({

    container: {
      backgroundColor:'#ffffff',
      paddingBottom: '2%'
    },

});