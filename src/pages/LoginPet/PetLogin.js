import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import plusS from '../../assets/plusS.png'; 
import plus from '../../assets/plus.png'; 
import logo from '../../assets/logo.png';
import Place_Holder from '../../assets/Place_Holder.png'; 

import { GetImageOrder } from '../../Components/GetImages'

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
  } from '@expo-google-fonts/nunito'


//tem que checar as dimensões da tela
export default function PetLogin({navigation}){
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_600SemiBold,
    })

    const [pets, setPets] = React.useState([]);

    async function getPets () {
        const userId = JSON.parse(await AsyncStorage.getItem('user'))['id'];
        await axios.get(`https://amicusco-pet-api.herokuapp.com/petsbyuser/${userId}`).then(resp => setPets(resp.data)).catch(err => console.log(err));
    }

    useEffect(() =>{
        getPets();
    },[]);
    
    async function setPetData (pet){
        await AsyncStorage.setItem('pet', JSON.stringify(pet));
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
            var image = GetImageOrder(pet['pet_media']); 
            return(
            <TouchableOpacity style={styles.input} key={index} onPress={() => setPetData(pet)}>
                <Image source={image ? {uri: image} : Place_Holder} style={[styles.icon,{ resizeMode:"contain", width: 35, height: 35, borderRadius: 180 }]}/>
                <Text style={styles.text}>{pet.name}</Text>
                <Text style={styles.text}></Text>      
            </TouchableOpacity>
            )
        })} 
        
        <TouchableOpacity style={styles.input} blurRadius={90} onPress={() => { navigation.navigate('PetPerfil')}}>
            <Image source={plusS} style={[{ resizeMode: 'cover', width: 50, height: 50 }]}/>
            <Text style={[styles.text, {paddingLeft: '1%'}]}>Novo PetPerfil</Text>      
        </TouchableOpacity>
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
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '1%',
        paddingBottom: '5%'

    },

    containerButton: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '5%',
        paddingHorizontal: '3%',

    },
    
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 40,
        marginTop: '2%',
        alignItems: 'center',
        flexDirection: "row"
        
    },

    text: {
        color: '#000',
        fontWeight:'bold',
        fontFamily: 'Nunito_400Regular',
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: '2%'
        },

    tittleText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Nunito_700Bold',
        textAlign: 'center',
        paddingBottom: '3%',
        textShadowColor: "#111",
        textShadowOffset: {
            height: 2,
            width: 0
        },
        textShadowRadius: 9
    },
          
    icon: {
        marginLeft: '1%'   
    },

    accountText: {
        textDecorationLine: 'underline',
        marginTop: '2%',
        marginLeft: '2%'
    }
});