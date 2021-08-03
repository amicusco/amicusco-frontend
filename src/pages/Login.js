import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import logo from '../assets/logo.png';


export default function Login(){
    return (
    <LinearGradient 
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {{
        flex:1,
    }}>
    <View style={styles.container}>
        <Image source={logo} style={{ width: 134, height: 129 }} />
    </View>
    </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30

    },
});