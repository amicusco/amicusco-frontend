import React from 'react';
import { View, Text, Button } from 'react-native';
import Login from './Login';

export default function Main() {
    return(
        <View>
            <Button title="Navigate to login" onPress={Login}></Button>   
        </View>
    )
}