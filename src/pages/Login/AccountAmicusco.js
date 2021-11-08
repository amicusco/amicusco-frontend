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
        console.log(resp.data);
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
        AsyncStorage.setItem('user', JSON.stringify(resp.data));
    }).catch(err => setError(err.toJSON().message));
}

//ta bugado
function checkFields(data, navigation, setError, wrongData) {
    console.log(data)
    if (data['name']==''){
        return alert("Insira o seu nome");

    }
    // else if (data['age']==''){
    //     return alert("Insira a sua idade");

    // }
    else if (wrongData===1){
        return alert("Insira um telefone");

    }
    else if (data['email']==''){
        return alert("Insira um e-mail");

    }
    else if (data['password']==''){
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
    const [mail, setMail] = React.useState('');
    const [age, setAge] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');

    const[wrongData,setWrongData]=React.useState(0)
    

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
            onChangeText={(name)=>setName(name.replace(/[^A-Za-z ]/g, ''))}
            onChange={(e) => setData({...data, 'name': e.target.value})} 
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
            onChangeText={(age)=> setAge(age)}
            //onChange={(e) => setData({...data, 'idade': e.target.value})}
            />            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="   Deixe o link de alguma rede social"
            //onChange={(e) => setData({...data, 'rede_social': e.target.value})}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        {/* {data['phoneNumber']=''} */}
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Telefone:</Text>  
            <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            keyboardType={'phone-pad'}
            placeholder={'   Digite o seu Telefone'}
            value={phone}
            options={{maskType:'BRL', withDDD: true, dddMask: '   (99) '}}
            onChangeText={(phone)=> setPhone(phone)}
            onChange={(e) => setData({...data, 'phoneNumber': e.target.value }
            )} />
            {(phone === '' && data['phoneNumber'] != null ) && <Text style={{color: 'red', paddingTop:2}}>Digite telefone!</Text>}
        </View>
            {console.log(phone)}
        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={[styles.input,{borderColor: error !== '' ? 'red' : ''}]}
            keyboardType={ 'email-address' }
            placeholder={' Digite o seu E-mail'}
            value={mail}
            onChangeText={setMail}
            onChange={(e) => setData({...data, 'email': e.target.value })} />
            {error.slice(-3) === '500' && <Text style={{color: 'red', paddingTop:2}}>E-mail já cadastrado!</Text>}
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha:</Text>
            <View style={[styles.input, {flexDirection:'row', alignItems:'center'}]}>  
            <TextInput
            style={[styles.input, {width:'100%', height: 46}]}
            keyboardType={'password'}
            secureTextEntry={hidePass}
            placeholder='Digite a sua senha '
            value={pass}
            onChangeText={(pass) => setPass(pass)}
            onChange={(e) => setData({...data, 'password': e.target.value})}/>
            <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{ paddingHorizontal:'5%', alignItems:'center', justifyContent:'center', width:'15%'}}>
                <Ionicons name="eye" size={22} color='#111'/>
            </TouchableOpacity>
            </View>
            {(pass === '' && data['phoneNumber'] != null ) && <Text style={{color: 'red', paddingTop:2}}>Digite telefone!</Text>}
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => checkFields(data, navigation, setError, wrongData)}>
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
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 4,
        fontFamily:'Nunito_300Light',
        fontSize: 15,
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