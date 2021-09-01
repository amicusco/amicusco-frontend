import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default function AccountRecovery({ navigation }){
    return(
    <View styles={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Digite o seu e-mail cadastrado:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'email-address'}
            autoCompleteType={'email'}
            placeholder="Digite o seu e-mail"/>
        </View>

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}>
            {/* <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/> */}
            <Text style={styles.inputSubmitButtonTxt}>Receber código de recuperação</Text>     
        </TouchableOpacity>
        </View>

    </View>
    )}

const styles = StyleSheet.create({

    container: {
        flex:1,
        borderRadius:50,
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: 30,
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