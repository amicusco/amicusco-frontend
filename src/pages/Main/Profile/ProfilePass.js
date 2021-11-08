import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import axios from 'axios';
import logo from '../../../assets/logo.png';
import {Ionicons} from "@expo/vector-icons";



//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

// async function Submit (email, setError, setSuccess) {
//     await axios.post('https://amicusco-auth.herokuapp.com/recoverPassword', {email}).then(resp => setSuccess(resp)).catch(err => setError(err.toJSON().message));
// }

export default function ProfilePass({ navigation }){
    const[pass, setPass] = useState('');
    const[newPass1, setnewPass1] = useState('');
    const[newPass2, setnewPass2] = useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [hidenewPass1, sethidenewPass1] = React.useState(true);
    const [hidenewPass2, sethidenewPass2] = React.useState(true);
    const [hidePass, sethidePass] = React.useState(true);

    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })

    function Validation (newPass1, newPass2, setSucess){
        if (!!newPass1 && !!newPass2){
            if (newPass1 === newPass2) setSucess(true);
            else return "Senhas diferentes!";
        } else return "";
    }
    
    const screenHeight = Dimensions.get('window').height;

    return(
        <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>

            <View style={{flex: 0.9}}>  
                <ScrollView>
                    <View>
                        <Text style={styles.headerText}>Perfil do Dono</Text>
                    </View>
                {/* <Text style={styles.txt}>Digite o seu e-mail cadastrado:</Text>  
                <TextInput
                style={[styles.input,{borderColor: error !== '' ? 'red' : (success.status === 200 && '#329542')}]}
                autoFocus={true}
                keyboardType={'email-address'}
                autoCompleteType={'email'}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu e-mail"/>
                {error.slice(-3) === '401' 
                ? <Text style={{color: 'red', paddingTop:2}}>Email não encontrado!</Text> 
                : (success.status === 200 && <Text style={{color: '#329542', paddingTop:2}}>Email enviado!</Text>)} */}
                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Senha atual:</Text>
                        <View style={[styles.input,{flexDirection:'row', alignItems:'center',borderColor: error !== '' ? 'red' : '' }]}>   
                            <TextInput
                            style={{width:'100%', height: 46, paddingHorizontal:10}}
                            keyboardType={'default'}
                            placeholder="   Digite a sua senha"
                            onChangeText={(pass) => setPass(pass)}
                            secureTextEntry={hidePass}
                            value={pass}
                            onChangeText={setPass} />
                            {error.slice(-3) === '401' 
                            ? <Text style={{color: 'red', paddingTop:2}}>Senha incorreta!</Text> 
                            : ''} 
                            <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                <Ionicons name="eye" size={22} color='#111'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Nova Senha:</Text>
                            <View style={[styles.input,{flexDirection:'row', alignItems:'center'}]}>   
                                <TextInput
                                style={{width:'100%', height: 46, paddingHorizontal:10}}
                                keyboardType={'default'}
                                placeholder="   Digite a sua senha"
                                onChangeText={(newPass1) => setnewPass1(newPass1)}
                                secureTextEntry={hidenewPass1}
                                value={newPass1}
                                onChangeText={setnewPass1} />
                                <TouchableOpacity onPress={() => sethidenewPass1(!hidenewPass1)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                    <Ionicons name="eye" size={22} color='#111'/>
                                </TouchableOpacity>
                            </View>
                    </View>

                    <View style={styles.containerInput}>
                        <Text style={styles.txt}>Digite novamente:</Text>
                        <View style={[styles.input,{flexDirection:'row', alignItems:'center'}]}>   
                            <TextInput
                            style={{width:'100%', height: 46, paddingHorizontal:10}}
                            keyboardType={'default'}
                            placeholder="   Digite novamente a sua senha"
                            onChangeText={(newPass2) => setnewPass2(newPass2)}
                            secureTextEntry={hidenewPass2}
                            value={newPass2}
                            onChangeText={setnewPass2} />
                            <TouchableOpacity onPress={() => sethidenewPass2(!hidenewPass2)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                                <Ionicons name="eye" size={22} color='#111'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                <View style={styles.containerInput}>
                <TouchableOpacity 
                    style={styles.inputSubmitButton}
                    //onPress={() => Submit(email, setError, setSuccess)}
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