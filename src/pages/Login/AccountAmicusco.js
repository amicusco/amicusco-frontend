import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputMask} from 'react-native-masked-text';

import logo from '../../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';

async function Submit (data, navigation) {
    await axios.post("https://amicusco-auth.herokuapp.com/user", data)
    .then(resp => {
        console.log(resp.data);
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
        AsyncStorage.setItem('user', JSON.stringify(resp.data));
    }).catch(err => console.log(err));
}

export default function AccountAmicusco({ navigation }) {
    const [data, setData] = React.useState({});
    const [pass, setPass] = React.useState('');
    const [hidePass, sethidePass] = React.useState(true);
    const [phone, setPhone] = React.useState('');
    const [mail, setMail] = React.useState('');

    return(
    <ScrollView style={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o seu nome completo"
            onChange={(e) => setData({...data, 'name': e.target.value})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a sua idade"
            //onChange={(e) => setData({...data, 'idade': e.target.value})}
            />            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Deixe o link de alguma rede social"
            //onChange={(e) => setData({...data, 'rede_social': e.target.value})}
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
            onChangeText={(phone)=> setPhone(phone)}
            onChange={(e) => setData({...data, 'phoneNumber': e.target.value }
            )} />
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInputMask
            style={styles.input}
            type={ 'custom' }
            keyboardType={ 'email-address' }
            placeholder={'   Digite o seu E-mail'}
            value={mail}
            options={{mask:'*****************************'}}
            onChangeText={(mail)=> setMail(mail)}
            onChange={(e) => setData({...data, 'email': e.target.value })} />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha:</Text>
            <View style={[styles.input,{flexDirection:'row', alignItems:'center'}]}>  
            <TextInput
            style={{width:'100%', height: 46, paddingHorizontal:10}}
            keyboardType={'password'}
            secureTextEntry={hidePass}
            placeholder="Digite a sua senha"
            value={pass}
            onChangeText={(pass) => setPass(pass)}
            onChange={(e) => setData({...data, 'password': e.target.value})}/>
            <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                <Ionicons name="eye" size={22} color='#111'/>
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            //Quando o botão fizer duas coisas é so chamar em sequencia onPress
            style={styles.inputSubmitButton}
            onPress={() => Submit(data, navigation)}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>     
            <Text style={styles.inputSubmitButtonTxt}>Cadastrar</Text>
            <Text style={styles.txt}></Text>       
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