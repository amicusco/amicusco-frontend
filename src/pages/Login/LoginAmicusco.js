import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioForm from 'react-native-simple-radio-button';
import {TextInputMask} from 'react-native-masked-text';

import logo from '../../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

async function Submit (data, navigation, setError) {
    await axios.post("https://amicusco-auth.herokuapp.com/login", data).then(resp => {
        AsyncStorage.setItem('user', JSON.stringify(resp.data));
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
    }).catch(err => setError(err.toJSON().message));
}


export default function LoginAmicusco({ navigation }){ 

    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })

    const [data, setData] = React.useState({
        password: '',
        isValidUser: true,
        isValidPassword: true,
    });

    const [type, setType] = React.useState('');

    const radioProps = [
        { label: 'E-mail', value: 'email' },
        { label: 'Telefone', value: 'phoneNumber' }];

    const [pass, setPass] = React.useState('');
    const [hidePass, sethidePass] = React.useState(true);

    const [mail, setMail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState('');
    


    return(
    <View style={styles.container}>
       
        <View style={styles.containerInput}>
            <Text style={styles.txt}>{type === 'email' ? 'E-mail:' : 'Número de Telefone:'}</Text>  
            <TextInputMask
            style={[styles.input,{borderColor: error !== '' ? 'red' : ''}]}
            type={type === 'email' ? 'custom' : 'cel-phone'}
            autoFocus={true}
            keyboardType={type === 'email' ? 'email-address' : 'phone-pad'}
            placeholder={type === 'email' ? '   Digite o seu E-mail' : '   Digite o seu Telefone'}
            value={type === 'email' ? mail : phone}
            options={type === 'email' ? {mask:'   *****************************'} : {maskType:'BRL', withDDD: true, dddMask: '   (99) '}}
            onChangeText={ type === 'email' ? 
                (mail)=> {setMail(mail); setData({...data, 'email': mail.trim() });} : 
                (phone)=> {setPhone(phone); setData({...data, 'phoneNumber': phone.trim() });}
            }
            />
            {error.slice(-3) === '401' && <Text style={{color: 'red', paddingTop:2}}>Credenciais Inválidas! {'\n'}Verifique se o {type === 'email' ? 'E-mail' : 'Número de Telefone'} e Senha estão corretos.</Text>}
        </View>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha:</Text>
            <View style={[styles.input,{flexDirection:'row', alignItems:'center'}]}>  
            <TextInput
                style={{width:'100%', height: 46, paddingHorizontal:'15%'}}
                keyboardType={'password'}
                secureTextEntry={hidePass}
                placeholder="Digite a sua senha"
                value={pass}
                onChangeText={(pass) => {setPass(pass);setData({...data, 'password': pass.trim()});}}/>
                <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{ paddingRight:'10%', alignItems:'center', justifyContent:'center', width:'20%' }}>
                    <Ionicons name="eye" size={22} color='#111'/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Selecione a sua forma de Login</Text>  
            <RadioForm
                buttonColor="#E8C9AE"
                buttonSize={15}
                radioStyle={{paddingLeft:25, paddingTop:25}}
                selectedButtonColor="#E8C9AE"
                radio_props={radioProps}
                initial={1}
                animation={true}
                formHorizontal={true}
                onPress={value => setType(value)}
                />
        </View>

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => {Submit(data, navigation, setError)}}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.inputSubmitButtonTxt}>Entrar</Text> 
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
        marginBottom: '5%',
        paddingHorizontal: '5%'

    },

    input: {
        height: 46,
        width:'100%',
        fontFamily:'Nunito_400Regular',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: '2%',
        backgroundColor: '#F6E9DF'
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'4%',
        marginBottom:'4%',
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
        paddingTop: '2%',
        fontSize: 18,
        fontFamily:'Nunito_700Bold',
        textAlign: 'left'
    },

    icon: {
        marginLeft: 5   
    },
});