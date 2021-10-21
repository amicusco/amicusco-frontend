import * as React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



export default function Main({ navigation }) {
    async function test (){
      console.log(await AsyncStorage.getItem('pet'));
    }

    test();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main</Text>
        <Button 
        title="Details" 
        />
      </View>
    );
  }

