import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View,Text, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native';

import plus from '../assets/plus.png'; 
import logo from '../assets/logo.png';
import face from '../assets/face.png';
import google from '../assets/google.png';


export default function Login(){
    return (
    <LinearGradient 
    locations={[0,1,1.5]}
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {styles.gradient}>

    <View style={styles.containerPlus}>
        <Image source={plus} style={{ width: 230, height: 160 }} />
    </View>

    <View style={styles.containerLogo}>
        <Image source={logo} style={{ width: 134, height: 136 }} />
    </View> 

    <View style={styles.containerButton}>
        <TouchableOpacity style={styles.inputFace}>
            <Image source={face} style={[styles.icon,{ width: 35, height: 40 , marginTop: 4 }]} />
            <Text style={styles.text}>Login Com Facebook</Text>  
            <Text style={styles.text}></Text>   
        </TouchableOpacity>    
        <TouchableOpacity style={styles.inputGoogle}>
            <Image source={google} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.text}>Login Com Google</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>
    </View> 
    </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex:1,
        borderRadius:50
    },

    containerPlus: {
        flex: 1,
        alignItems: 'center',
        padding: 30

    },
    
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        padding: 30

    },

    containerButton: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 15,

    },
    
    inputFace: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#3B5998',
        borderRadius: 40,
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"        
    },
    
    inputGoogle: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontSize: 16,
        textAlign: 'center',
        },

    icon: {
        marginLeft: 5   
    }
});