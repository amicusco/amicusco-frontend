import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    await axios.post("https://amicusco-auth.herokuapp.com/user", data)
    .then(resp => {
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
        AsyncStorage.setItem('user', JSON.stringify(resp.data));
    }).catch(err => setError(err.toJSON().message));
}


function checkFields(data, navigation, setError) {
    if (data['name']==''|| data['name']==null){
        return alert("Insira o seu nome");

    }
    else if (data['age']=='' || data['age']==null){
        return alert("Insira a sua idade");
    }
    else if (data['phoneNumber']=='' || data['phoneNumber']==null || data['phoneNumber'].length < 10){
        return alert("Insira um telefone");
    }
    else if (data['email']=='' || data['email']==null){
        return alert("Insira um e-mail");
    }
    else if (!data['email'].match(/^[a-z0-9._]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/g)){
        return alert("Formato de e-mail inválido!");
    }
    else if (data['password']=='' || data['password']==null){
        return alert("Insira uma senha");
    }
    else {
        Submit(data, navigation, setError);
  }}

export default function AccountAmicusco({ navigation }) {
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })
    
    const [data, setData] = React.useState({});
    const [pass, setPass] = React.useState('');
    const [hidePass, sethidePass] = React.useState(true);
    const [phone, setPhone] = React.useState('');
    const [social, setSocial] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [age, setAge] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');

    
    function checkOnChange(type, value){
        if (type === "name"){
            const newValue = value.replace(/[^A-Za-z ]/g, '');
            setName(newValue);
            setData({...data, 'name': newValue});
        }
        if (type === "age"){
            setAge(value);
            setData({...data, 'age': value});
        }
        if (type === "phone"){
            const newValue = value.replace(/[^\d]/g, "");
            setPhone(newValue);
            setData({...data, 'phoneNumber': newValue});
        }
        if (type === "social"){
            setSocial(value);
            setData({...data, 'social': value});

        }
        if (type === "mail"){
            setMail(value);
            setData({...data, 'email': value});

        }
        if (type === "pass"){
            setPass(value);
            setData({...data, 'password': value});

        }
    }

    return(
    <ScrollView style={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="   Digite o seu nome completo"
            value={name}
            onChangeText={(name) => checkOnChange('name', name)}
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInputMask
            style={styles.input}
            type={ 'custom' }
            keyboardType={'numeric'}
            placeholder="   Digite a sua idade"
            value={age}
            options={{mask:'99'}}
            onChangeText={(age) => checkOnChange('age', age.trim())}
            />            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="   Deixe o link de alguma rede social"
            value={social}
            onChangeText={(social) => checkOnChange('social', social)}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Telefone:</Text>  
            <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            keyboardType={'phone-pad'}
            placeholder={'   Digite o seu Telefone'}
            value={phone}
            options={{maskType:'BRL', withDDD: true, dddMask: '   (99) '}}
            onChangeText={(phone)=> checkOnChange('phone', phone.trim())}/>
        </View>
            
        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={[styles.input,{borderColor: error.slice(-3) === '500' ? 'red' : ''}]}
            keyboardType={ 'email-address' }
            placeholder={'  Digite o seu E-mail'}
            value={mail}
            onChangeText={(mail)=> checkOnChange('mail', mail.trim())}/>
            {error.slice(-3) === '500' && <Text style={{color: 'red', paddingTop:2}}>E-mail já cadastrado!</Text>}
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha (mínimo 8 digitos):</Text>
            <View style={[styles.input, {flexDirection:'row', alignItems:'center'}]}>  
                <TextInput
                style={[{ fontFamily:'Nunito_400Regular', paddingHorizontal:'13%', width:'100%', height: 46, borderColor: error.slice(-3) === '406' ? 'red' : ''}]}
                keyboardType={'password'}
                secureTextEntry={hidePass}
                placeholder='Digite a sua senha'
                value={pass}
                onChangeText={(pass) => checkOnChange('pass', pass.trim())}/>
                <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{ paddingRight:'10%', alignItems:'center', justifyContent:'center', width:'20%' }}>
                    <Ionicons name="eye" size={22} color='#111'/>
                </TouchableOpacity>
            </View>
            {error.slice(-3) === '406' && <Text style={{color: 'red', paddingTop:2}}>A senha deverá ter no mínimo 8 digitos!</Text>}
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => checkFields(data, navigation, setError)}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>     
            <Text style={[styles.inputSubmitButtonTxt]}>Cadastrar</Text>
            <Text style={styles.txt}></Text>       
        </TouchableOpacity>
        </View>
      
    
    </ScrollView>  
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: '10%',
        paddingHorizontal: '3%'

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
        marginTop:'1%',
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
        paddingTop: '2%',
        fontSize: 18,
        fontFamily: 'Nunito_400Regular',
        textAlign: 'left'
    },

    icon: {
        marginLeft: '1%'   
    },
});