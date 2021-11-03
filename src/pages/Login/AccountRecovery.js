import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

import logo from '../../assets/logo.png';

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

async function Submit (email, setError, setSuccess) {
    await axios.post('https://amicusco-auth.herokuapp.com/recoverPassword', {email}).then(resp => setSuccess(resp)).catch(err => setError(err.toJSON().message));
}

export default function AccountRecovery({ navigation }){
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })

    return(
    <View styles={styles.container}>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Digite o seu e-mail cadastrado:</Text>  
            <TextInput
            style={[styles.input,{borderColor: error !== '' ? 'red' : (success.status === 200 && '#329542')}]}
            autoFocus={true}
            keyboardType={'email-address'}
            autoCompleteType={'email'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu e-mail"/>
            {error.slice(-3) === '401' 
            ? <Text style={{color: 'red', paddingTop:2}}>Email não encontrado!</Text> 
            : (success.status === 200 && <Text style={{color: '#329542', paddingTop:2}}>Email enviado!</Text>)}
        </View>

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => Submit(email, setError, setSuccess)}>
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
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: '8%',
        paddingHorizontal: '1%'

    },

    input: {
        height: 46,
        width:'90%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 16,
        fontFamily: 'Nunito_300Light',
        borderRadius: 4,
        marginTop: '2%',
        backgroundColor: '#F6E9DF' 
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    inputSubmitButtonTxt: {
        color: 'white',
        fontSize: 20,
        fontFamily:'Nunito_700Bold',
        fontWeight:'bold',
        textAlign: 'center'
    },

    txt:{
        paddingTop: '5%',
        fontSize: 18,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'left'
    },

    icon: {
        marginLeft: 5   
    },
});