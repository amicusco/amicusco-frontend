import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import plus from '../../assets/plus.png'; 
import logo from '../../assets/logo.png';

export default function PetLogin({navigation}){
    return (
    <LinearGradient 
    locations={[0,1,1.5]}
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {styles.gradient}>    

    <View style={styles.containerPlusLogo}>
        <Image source={plus} style={{resizeMode:"contain", width: 230, height: 160 }} />
        <Image source={logo} style={{resizeMode:"contain", width: 134, height: 136 }} />
    </View>

    <View style={styles.containerButton}>

        <View>
            <Text style={styles.tittleText}>Selecione o perfil desejado</Text>
        </View>

        <TouchableOpacity style={styles.inputGoogle}>
            <Text style={styles.text}>Nome do Pet</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.inputGoogle}>
            <Text style={styles.text}>Nome do Pet</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputGoogle} blurRadius={90}>
            <Image source={plus} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={[styles.text, {fontWeight: 'normal'}]}>Novo Perfil</Text>
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

    containerPlusLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60
    },

    containerButton: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 15,

    },
    
    inputGoogle: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop:10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontSize: 16,
        textAlign: 'center'
        },

    tittleText: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 20,
        textShadowColor: "#111",
        textShadowOffset: {
            height: 4,
            width: 0
        },
        textShadowRadius: 9
    },
          
    icon: {
        marginLeft: 5   
    },

    accountText: {
        textDecorationLine: 'underline',
        marginTop:20,
        marginLeft:10
    }
});