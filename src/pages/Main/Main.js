import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons"

export default function Main({ navigation }) {
    async function test (){
      console.log(await AsyncStorage.getItem('pet'));
    }

    test();

    const screenHeight = Dimensions.get('window').height;

    return (

      <View style={[{height:screenHeight},styles.container]}>
        <View style={{flex: 0.9}}>
          <ScrollView>

          <Text style={{alignSelf: 'center', paddingTop: "70%"}}>EM BREVE ...</Text>

          </ScrollView>
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:'1%'}}>
          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:40, height:40}}
              disabled
              onPress={() => navigation.navigate('Main')}>   
              <Image source={logo} style={ {width: 30, height: 30}} />
          </TouchableOpacity>  

          <TouchableOpacity 
              style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Chat')}>   
              <Ionicons name="chatbubbles-outline" size={30} color='#E8C9AE'/>
          </TouchableOpacity>

          <TouchableOpacity 
              style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Profile')}>   
              <Ionicons name="person-circle-outline" size={35} color='#E8C9AE'/>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({

    container: {
      backgroundColor:'#ffffff'

    },

});