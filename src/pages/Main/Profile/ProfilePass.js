import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import axios from 'axios';
import logo from '../../../assets/logo.png';
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';



//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

async function Submit (data, userId, navigation, setUser) {
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    await axios.put(`https://amicusco-auth.herokuapp.com/users/${userId}`, data)
    .then(resp => {
        const keys = Object.keys(resp.data);
        keys.forEach(key => {
            if (key !== 'id')
                user[key] = resp.data[key];
                setUser(user);
                AsyncStorage.setItem('user', JSON.stringify(user));
        });
        alert("Senha alterada!");
        navigation.navigate('StackMain', {screen: 'ProfilePass'});
    })
    .catch(err => console.log(err));
}

export default function ProfilePass({ navigation }){
    const[pass, setPass] = useState('');
    const[password, onChangePassword] = useState('');
    const[newPass1, setnewPass1] = useState(null);
    const[newPass2, setnewPass2] = useState('');
    const[newPassError, setNewPassError] = useState(null);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);
    const [hidenewPass1, sethidenewPass1] = React.useState(true);
    const [hidenewPass2, sethidenewPass2] = React.useState(true);
    const [hidePass, sethidePass] = React.useState(true);
    const [user, setUser] = useState(null);
    const [data, setData] = useState({});
    const[userId, onChangeUserId] = useState(null);
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })

    function ValidationPass (value){
        setPass(value);
        if(!!pass){
            if (value === password) 
                setSuccess(true);
            else 
                setSuccess(false);
        }
    }

    function ValidationNewPass(value) {
        setnewPass2(value);
        if (!!newPass1 && !!newPass2){
            if (newPass1 == value) {
                setNewPassError(false);
                setData({...data, 'password': value});
            }
            else setNewPassError(true);
        }
    }

    function checkFields(){
        if (success && !newPassError)
            Submit(data, userId, navigation, setUser);
    }

    useEffect(() => {
        const getUser = async() => {
            let user = JSON.parse(await AsyncStorage.getItem('user'));
            setUser(user);
            onChangeUserId(user['id']);
            onChangePassword(user['password']);
            //setLoadingUser(false);   
            //console.log(loadingUser);             
        }
        getUser();

        
    }, []);
    
    const screenHeight = Dimensions.get('window').height;

    return(
        <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>

            <View style={{flex: 0.9}}>  
                <ScrollView>
                    <View>
                        <Text style={styles.headerText}>Perfil do Dono</Text>
                    </View>

                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Senha atual:</Text>
                        <View style={[styles.input,{flexDirection:'row', alignItems:'center', borderColor: success ? '#329542' : (success == null ? '' : 'red') }]}>   
                            <TextInput
                            style={{width:'100%', height: 46, paddingHorizontal:10}}
                            keyboardType={'default'}
                            placeholder="   Digite a sua senha"
                            onChangeText={(e) => ValidationPass(e)}
                            secureTextEntry={hidePass}
                            value={pass}
                            />
                            <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                <Ionicons name="eye" size={22} color='#111'/>
                            </TouchableOpacity>
                        </View>
                        {success === false && <Text style={{color: 'red', paddingTop:2}}>Senha incorreta!</Text>} 
                    </View>
                    
                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Nova Senha:</Text>
                            <View style={[styles.input,{flexDirection:'row', alignItems:'center', borderColor: !!newPass1 && (newPass1.length < 8 ? 'red' : '#329542')}]}>   
                                <TextInput
                                style={{width:'100%', height: 46, paddingHorizontal:10}}
                                keyboardType={'default'}
                                placeholder="   Digite a sua nova senha"
                                secureTextEntry={hidenewPass1}
                                onChangeText={(e) => setnewPass1(e)}
                                value={newPass1 || ''}
                                />
                                <TouchableOpacity onPress={() => sethidenewPass1(!hidenewPass1)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                    <Ionicons name="eye" size={22} color='#111'/>
                                </TouchableOpacity>   
                            </View>
                            {!!newPass1 && newPass1.length < 8 && <Text style={{color: 'red', paddingTop:2}}>"Insira uma senha de pelo menos 8 dígitos!"</Text>}
                    </View>

                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Digite novamente:</Text>
                        <View style={[styles.input,{flexDirection:'row', alignItems:'center', borderColor: newPassError === false ? '#329542' : (!!newPassError && 'red') }]}>   
                            <TextInput
                            style={{width:'100%', height: 46, paddingHorizontal:10}}
                            keyboardType={'default'}
                            placeholder="   Digite novamente a sua nova senha"
                            onChangeText={(e) => ValidationNewPass(e)}
                            secureTextEntry={hidenewPass2}
                            value={newPass2}
                            />
                            <TouchableOpacity onPress={() => sethidenewPass2(!hidenewPass2)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                <Ionicons name="eye" size={22} color='#111'/>
                            </TouchableOpacity>
                        </View>
                        {!!newPassError && newPassError && <Text style={{color: 'red', paddingTop:2}}>As senhas não são iguais!</Text>}
                    </View>

                <View style={styles.containerInput}>
                <TouchableOpacity 
                    style={styles.inputSubmitButton}
                    onPress={() => checkFields()}
                    >
                    <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]} />

                    <Text style={styles.inputSubmitButtonTxt}>Alterar</Text>
                    <Text style={styles.txt}></Text>     
                </TouchableOpacity>
                </View>

            </ScrollView>
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:5 ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:10}}>
            <TouchableOpacity 
                style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:50, height:50}}
                onPress={() => navigation.navigate('Main')}>   
                <Image source={logo} style={ {width: 40, height: 40}} />
            </TouchableOpacity>  

            <TouchableOpacity 
                style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:50, height:50}}
                onPress={() => navigation.navigate('Chat')}>   
                <Ionicons name="chatbubbles-outline" size={40} color='#E8C9AE'/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:50, height:50}}
                onPress={() => navigation.navigate('Profile')}
                disabled>   
                <Ionicons name="person-circle-sharp" size={45} color='#E8C9AE'/>
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
        paddingLeft: 20

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
        backgroundColor: '#F6E9DF',
        
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
        marginRight: 20 
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

    headerText:{
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: 20
    }
});