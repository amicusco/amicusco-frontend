import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function AccountAmicusco({ navigation }) {
    return(
    <ScrollView style={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o seu nome completo"/>
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a sua idade"/>
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Deixe o link de alguma rede social"/>
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 


        <View style={styles.containerInput}>
            <Text style={styles.txt}>Telefone:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Digite o seu telefone"/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            placeholder="Digite o seu e-mail"/>
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}>
            {/* <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/> */}
            <Text style={styles.inputSubmitButtonTxt}>Cadastrar</Text>     
        </TouchableOpacity>
        </View>
      
    
    </ScrollView>  
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        borderRadius:50,
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 15

    },

    input: {
        height: 46,
        width:'90%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: 20
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    inputSubmitButtonTxt: {
        color: "white",
        fontWeight:'bold'
    },

    txt:{
        paddingTop: 20,
        textAlign: 'left'
    }
});