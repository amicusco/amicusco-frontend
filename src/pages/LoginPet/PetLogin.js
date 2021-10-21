import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

import plusS from '../../assets/plusS.png'; 
import plus from '../../assets/plus.png'; 
import logo from '../../assets/logo.png';
import Place_Holder from '../../assets/Place_Holder.png'; 


export default function PetLogin({navigation}){

    const [pets, setPets] = React.useState([]);

    console.log(pets);
    //tem um warning aqui
    async function getPets () {
        const userId = JSON.parse(await AsyncStorage.getItem('user'))['id'];
        await axios.get(`https://amicusco-pet-api.herokuapp.com/pets?userId=${userId}`).then(resp => setPets(resp.data)).catch(err => console.log(err));
    }

    useEffect(() =>{
        getPets();
    },[]);
    
    async function setPetData (pet){
        await AsyncStorage.setItem('pet', JSON.stringify(pet));
        console.log(await AsyncStorage.getItem('pet'));
        navigation.navigate('StackMain', {screen: 'Main'});
    }

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

        <View>
            <Text style={styles.tittleText}>Selecione o perfil desejado</Text>
        </View>

        {pets.map((pet, index) => {
            return(
            <TouchableOpacity style={styles.input} key={index} onPress={() => setPetData(pet)}>
                <Image source={Place_Holder} style={[styles.icon,{ resizeMode:"contain", width: 35, height: 35 }]}/>
                <Text style={styles.text}>{pet.name}</Text>
                <Text style={styles.text}></Text>      
            </TouchableOpacity>
            )
        })} 
        
        <TouchableOpacity style={styles.input} blurRadius={90} onPress={() => { navigation.navigate('PetPerfil')}}>
            <Image source={plusS} style={[{ resizeMode:"cover", paddingLeft:1, width: 50, height: 50 }]}/>
            <Text style={[styles.text, {fontWeight: 'bold', textAlign:'right'}]}>Novo Perfil</Text>      
        </TouchableOpacity>
    </View> 
    </LinearGradient>
    );
}


const styles = StyleSheet.create({
    gradient: {
        flex:1,
        borderRadius:50 
    },

    containerPlusLogo: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '50%'

    },

    containerButton: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
        paddingHorizontal: 15,

    },
    
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop:10,
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontSize: 16,
        textAlign: 'right',
        paddingLeft:10
        },

    tittleText: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 20,
        textShadowColor: "#111",
        textShadowOffset: {
            height: 4,
            width: 0
        },
        textShadowRadius: 9
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