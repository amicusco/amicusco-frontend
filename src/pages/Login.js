import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View,Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import plus from '../assets/plus.png'; 
import logo from '../assets/logo.png';
import face from '../assets/face.png';
import google from '../assets/google.png';

import Main from './Main';

const windowHeight = Dimensions.get('window').height;

function test(windowHeight){
    console.log(windowHeight)
    if (windowHeight<717){
        return(
            <View style={styles.containerPlusLogo}>
                <Image source={plus} style={{resizeMode:"contain", width: 230, height: 160 }} />
                <Image source={logo} style={{resizeMode:"contain", width: 134, height: 136 }} />
            </View>
        )
    }
}

export default function Login({navigation}){
    return (
    <LinearGradient 
    locations={[0,1,1.5]}
    colors = {['#E8C9AE','#87E9FF','#65D2EB']}
    style = {styles.gradient}>    

    <View style={styles.containerPlusLogo}>
        <Image source={plus} style={{resizeMode:"contain", width: 230, height: 160 }} />
        <Image source={logo} style={{resizeMode:"contain", width: 134, height: 136 }} />
    </View>

    <View style={styles.containerButton}>
        <TouchableOpacity 
            style={styles.inputAmicusco}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.text}>Entrar Com Conta AmisCusco</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputGoogle}>
            <Image source={google} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.text}>Entrar Com Google</Text>
            <Text style={styles.text}></Text>      
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputFace}>
            <Image source={face} style={[styles.icon,{ width: 35, height: 40 , marginTop: 4 }]} />
            <Text style={styles.text}>Entrar Com Facebook</Text>  
            <Text style={styles.text}></Text>   
        </TouchableOpacity>

        <View style={{flexDirection:'row'}}>
        <Text style={{marginTop:20}}>Não tem uma conta?</Text>

        <TouchableOpacity
            onPress={()=>navigation.navigate('Main')}>
            <Text style={styles.accountText}>Clique aqui</Text>
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
        <Text style={{marginTop:20}}>Problemas para fazer Login?</Text>
        
        <TouchableOpacity>
            <Text style={styles.accountText}>Clique aqui para resolver</Text>
        </TouchableOpacity>
        </View>
    </View> 
    </LinearGradient>
    );
}

export function LoginAmicusco(){
    <view>LoginAmicusco</view>
}

const styles = StyleSheet.create({
    gradient: {
        flex:1,
        borderRadius:50
    },

    containerPlusLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60
    },

    containerButton: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 15,

    },
    
    inputFace: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#3B5998',
        borderRadius: 40,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"        
    },
    
    inputGoogle: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop:10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    inputAmicusco: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontSize: 16,
        textAlign: 'center'
        },

    icon: {
        marginLeft: 5   
    },

    accountText: {
        textDecorationLine: 'underline',
        marginTop:20,
        marginLeft:10
    }
});