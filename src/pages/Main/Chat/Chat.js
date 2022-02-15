import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';
import Place_Holder from '../../../assets/Place_Holder.png';
import {Ionicons} from "@expo/vector-icons";



export default function Chat({ navigation }) {
  
  // async function test (){
  //   var test = JSON.parse(await AsyncStorage.getItem('pet'));
  //   await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${petid}`, data).then(resp => {

      
  // }).catch(err => console.log(err));

  // test();

    const screenHeight = Dimensions.get('window').height + StatusBar.currentHeight;

    return (

      <View style={[{height:screenHeight},styles.container]}>

        <View style={{flex: 0.9}}>
          <ScrollView>
            <View style={{alignItems: "flex-start", justifyContent:"flex-start", padding: '2%', paddingTop: '10%'}}>
              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:50, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'10%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

              <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

              <TouchableOpacity 
                  style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"center", width:140, height:100, paddingLeft:"2%"}}
                  onPress={() => navigation.navigate('ChatMessage')}>   
                  <Image source={Place_Holder} style={{width: 50, height: 50}} />
                  <Text style={{paddingLeft:"5%"}}>Developer</Text> 
              </TouchableOpacity>

            </View>
          </ScrollView>  
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:'1%'}}>
        <TouchableOpacity 
              style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Main')}>   
              <Image source={logo} style={ {width: 30, height: 30}} />
          </TouchableOpacity>  

          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Chat')}
              disabled>   
              <Ionicons name="chatbubbles-sharp" size={30} color='#E8C9AE'/>
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