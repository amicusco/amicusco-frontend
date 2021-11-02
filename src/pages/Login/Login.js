import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';

import plus from '../../assets/plus.png'; 
import logo from '../../assets/logo.png';
import face from '../../assets/face.png';
import google from '../../assets/google.png';

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito'

async function SubmitGoogle () {
    await axios.get("https://amicusco-auth.herokuapp.com/auth/google").then(resp => Linking.addEventListener('url', handleOpenURL)).catch(err => console.log(err));
}

async function SubmitFacebook () {
    await axios.get("https://amicusco-auth.herokuapp.com/auth/facebook").then(resp => Linking.addEventListener('url', handleOpenURL)).catch(err => console.log(err));
}

async function getUser (navigation){
    //await AsyncStorage.removeItem('user');
    const user = await AsyncStorage.getItem('user');
    if (user !== null){
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
    }
}

export default function Login({navigation}){
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_800ExtraBold
    })

    const [data, setData] = React.useState({});
    
    const handleOpenURL = ({ url }) => {
        if (url.indexOf("?id") !== -1) {
          if (url)
            setData(url);
        }
      };
    
    useEffect(() => {
        // Your code here
        Linking.addEventListener('url', handleOpenURL);
      }, []);
    
    getUser(navigation);

    return (
    <LinearGradient 
    locations={[0,1,1.5]}
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {styles.gradient}>    

    <View style={styles.containerPlusLogo}>
        <Image source={plus} style={{resizeMode:"contain", width: 230, height: 160 }} />
        <Image source={logo} style={{resizeMode:"contain", width: 134, height: 136 }} />
    </View>

    <View>
        <Text style={styles.tittleText}>Encontre um parceiro {"\n"} para o seu petmigo</Text>
        <Text style={[styles.text,{color: "#fff", fontWeight:'normal', fontFamily:'Nunito_300Light'}]}>Vamos encontrar um parceiro {"\n"} ideal para o seu Pet!</Text>
    </View>

    <View style={styles.containerButton}>
        <TouchableOpacity 
            style={styles.inputAmicusco}
            onPress={()=>navigation.navigate('LoginAmicusco')}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.text}>Entrar Com Conta AmiCusco</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputGoogle}
        onPress={()=>{Linking.openURL('https://amicusco-auth.herokuapp.com/auth/google');navigation.navigate('StackMain', {screen: 'PetLogin'})}}>        
            <Image source={google} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.text}>Entrar Com Google</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputFace}
        onPress={()=>{Linking.openURL('https://amicusco-auth.herokuapp.com/auth/facebook');navigation.navigate('StackMain', {screen: 'PetLogin'})}}>
            <Image source={face} style={[styles.icon,{ width: 35, height: 40 , marginTop: 4 }]} />
            <Text style={styles.text}>Entrar Com Facebook</Text>  
            <Text style={styles.text}></Text>   
        </TouchableOpacity>

        <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:20}}>Não tem uma conta?</Text>

            <TouchableOpacity
                onPress={()=>navigation.navigate('AccountAmicusco')}>
                <Text style={styles.accountText}>Clique aqui</Text>
            </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:20}}>Problemas para fazer Login?</Text>
            
            <TouchableOpacity
                onPress={()=>navigation.navigate('AccountRecovery')}>
                <Text style={styles.accountText}>Clique aqui para resolver</Text>
            </TouchableOpacity>
        </View>
    </View> 
    </LinearGradient>
    );
}


const styles = StyleSheet.create({
    gradient: {
        flex:1,
    },

    containerPlusLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10%'
    },

    containerButton: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '5%',
        paddingHorizontal: '2%',

    },
    
    inputFace: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#3B5998',
        borderRadius: 40,
        marginTop: '3%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"        
    },
    
    inputGoogle: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    inputAmicusco: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'4%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontFamily: 'Nunito_400Regular',
        fontSize: 18,
        textAlign: 'center'
        },

    icon: {
        marginLeft: 5   
    },

    accountText: {
        textDecorationLine: 'underline',
        fontFamily: 'Nunito_300Light',
        paddingTop: 20,
        paddingLeft: 10
    },

    tittleText: {
        color: '#fff',
        fontFamily: 'Nunito_700Bold',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: '1%',
        textShadowColor: "#111",
        textShadowOffset: {
            height: 4,
            width: 0
        },
        textShadowRadius: 9
    }
});