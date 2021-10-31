import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

import logo from '../../assets/logo.png';

async function Submit (email, setError) {
    await axios.post('https://amicusco-auth.herokuapp.com/recoverPassword', {email}).then(resp => console.log(resp.data)).catch(err => setError(err.toJSON().message));
}

export default function AccountRecovery({ navigation }){
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    return(
    <View styles={styles.container}>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Digite o seu e-mail cadastrado:</Text>  
            <TextInput
            style={[styles.input,{borderColor: error !== '' ? 'red' : ''}]}
            autoFocus={true}
            keyboardType={'email-address'}
            autoCompleteType={'email'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu e-mail"/>
            {error.slice(-3) === '401' && <Text style={{color: 'red', paddingTop:2}}>Email não encontrado!</Text>}
        </View>

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => Submit(email, setError)}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]} />

            <Text style={styles.inputSubmitButtonTxt}>Receber código de recuperação</Text>
            <Text style={styles.txt}></Text>     
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
        marginTop: 20,
        backgroundColor: '#F6E9DF' 
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    inputSubmitButtonTxt: {
        color: 'white',
        fontSize: 17,
        fontFamily:'Nunito_700Bold',
        fontWeight:'bold',
        textAlign: 'center'
    },

    txt:{
        paddingTop: 20,
        textAlign: 'left'
    },

    icon: {
        marginLeft: 5   
    },
});