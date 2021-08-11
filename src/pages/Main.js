import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ScrollView, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './Login';

export default function Main({ navigation }) {
    return(
    <LinearGradient 
    locations={[0,1,1.5]}
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {styles.gradient}>
        <View>
            <Text style={styles.txt}>Nome Completo:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o seu nome completo"/>
        </View>
        
            <View style={{height: 10, backgroundColor: 'black'}} /> 

        <View>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a sua idade"/>
        </View>
        <View>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Deixe o link de alguma rede social"/>
        </View>
        <View>
            <Text style={styles.txt}>Telefone:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Digite o seu telefone"/>
        </View>
        <View>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            placeholder="Digite o seu e-mail"/>
        </View>
        
        <View>
        <TouchableOpacity 
            style={styles.inputSubmitButton}>
            {/* <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/> */}
            <Text>Cadastrar</Text>     
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

    input: {
        height: 46,
        width:'90%',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: 20
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop:10,
        alignItems: 'center',
        flexDirection: "row"
    },

    txt:{
        paddingTop: 20
    }
});