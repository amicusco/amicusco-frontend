import * as React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



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

              <Text>Chat1</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>

              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>

              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>

              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat</Text>
              <Text>Chat1</Text>
          </ScrollView>
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:5 ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:10}}>
          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"blue", alignItems: "center",justifyContent:"center", width:"25%"}}
              onPress={() => navigation.navigate('Main')}>   
              <Text>Main</Text>
          </TouchableOpacity>  

          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"#F4F4F4", alignItems: "center",justifyContent:"center", width:"25%"}}
              disabled
              onPress={() => navigation.navigate('Chat')}>   
              <Text>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"blue", alignItems: "center",justifyContent:"center", width:"25%"}}
              onPress={() => navigation.navigate('Profile')}>   
              <Text>Profile</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({

    container: {
      borderRadius:50,
      backgroundColor:'#ffffff'

    },

});