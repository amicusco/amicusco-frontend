//react imports
import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tag } from '../../../Components/Tags'

//import fonts
import { useFonts } from 'expo-font';
import { 
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

//back-end import
import axios from 'axios';

import Camera from '../../../assets/camera.png';
import Place_Holder from '../../../assets/Place_Holder.png';  
import logo from '../../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons"


async function Submit (petid, data, tags, setPet ) {
    var pet = JSON.parse(await AsyncStorage.getItem('pet'));
    data = {...data, tags}; 
    await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${petid}`, data).then(resp => {
        const keys = Object.keys(resp.data);
        keys.forEach(key => {
            if (key !== 'id')
                pet[key] = resp.data[key];
                setPet(pet);
                AsyncStorage.setItem('pet', JSON.stringify(pet));
        });    
    }).catch(err => console.log(err));
}


export default function PetAdd({ navigation }) {
    //import fonts
    let [fontsLoaded]=useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })
    
    //console.log(isEnabled);

    //configurações do banco
    const [data, setData] = useState({});
    console.log(data);

    //Funções para tags de interesse
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const[bio, onChangeBio] = useState('');

    const[pet, setPet] = useState(null);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Funções para adicionar imagens
    const [image, setImage] = useState(Place_Holder);

    const [loadingBio, setLoadingBio] = useState(true);
    const [loadingInterests, setLoadingInterests] = useState(true);

    //Para adicionar as fotos
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Desculpe, nós precisamos da permissão da sua câmera!');
            }
        }
        })();
    }, []);
    
    useEffect(() => {
        const getPet = async () => {
            var petData = JSON.parse(await AsyncStorage.getItem('pet'));
            onChangeBio(petData['description']);
            setPet(petData);
            setLoadingBio(false);
        }
        getPet()

        const getInterests = async () => {
            let tags = await axios.get("https://amicusco-pet-api.herokuapp.com/tag");
            setInterests(tags.data);
            setLoadingInterests(false);
        }
        getInterests();
    }, []);
    //
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

    console.log(image);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    };
    
    //Corrigir tamanho da tela (não funciona para os interesses ja avisando)
    const screenHeight = Dimensions.get('window').height;

    return(
    <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>
        {!loadingBio && !loadingInterests && <>
        <View style={{flex: 0.9}}>
            <ScrollView>
                <View>
                    <Text style={styles.headerText}>Informações Adicionais</Text>
                </View>
                
                <View style={styles.imagePerfil}>
                    <ImageBackground style={{ resizeMode:"contain", width: '90%', height: 300}}>
                        <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                            <Image source={Camera} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/> 
                            <View/>      
                        </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />}
                    </ImageBackground>
                </View>
                
                <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/>  

                <View style={styles.containerInput}>
                    <Text style={styles.name}>{pet['name']}</Text>  
                </View>

                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Sobre:</Text>  
                    <TextInput
                    style={styles.inputMultiline}
                    autoFocus={true}
                    value={bio}
                    keyboardType={'default'}
                    placeholder={pet['description']}
                    onSubmitEditing={true}
                    autoComplete={false}
                    underlineColor='#ffffff'
                    multiline={true}
                    onChangeText={(e)=> setData({...data, 'description': e})} 
                    />
                </View>
                
                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 
                <Text style={styles.txt}>Interesses:</Text>
   
                <View style={styles.containerTags}>
                    {interests.map((interest, index) => {
                    return(
                    <Tag style={styles.tags} key={index} selectedInterests = {selectedInterests} setSelectedInterests={setSelectedInterests} tag={interest} petTags={pet['tags']}/>    
                    )
                })}  
                       
                </View> 

                <View style={styles.containerInput}>
                    <TouchableOpacity 
                        style={styles.inputSubmitButton}
                        onPress={() => Submit(pet['id'], data, selectedInterests, setPet)}>
                        <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
                        <Text style={styles.inputSubmitButtonTxt}>Atualizar Informações</Text> 
                        <Text style={styles.txt}></Text>     
                    </TouchableOpacity>
                </View>
            </ScrollView> 
        </View>    

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:5 ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:'1%'}}>
            <TouchableOpacity 
                style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
                onPress={() => navigation.navigate('Main')}>   
                <Image source={logo} style={ {width: 30, height: 30}} />
            </TouchableOpacity>  

            <TouchableOpacity 
                style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
                onPress={() => navigation.navigate('Chat')}>   
                <Ionicons name="chatbubbles-outline" size={30} color='#E8C9AE'/>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:40, height:40}}
                onPress={() => navigation.navigate('Profile')}
                disabled>   
                <Ionicons name="person-circle-sharp" size={35} color='#E8C9AE'/>
            </TouchableOpacity>
         
        </View>
        </>}
    </View>  
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginTop:'2%',
        marginBottom: '3%',
        paddingHorizontal: 15

    },

    containerTags: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
    },

    tags: {
        height: 46,
        width:'100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: '2%'
    },

    input: {
        height: 46,
        width:'100%',
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

    inputImage:{
        writingDirection: 'ltr',
        justifyContent:'space-around',
        alignSelf:'flex-end',
        backgroundColor: '#65D2EB',
        borderRadius: 360,
        height: 50,
        width: 50,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    inputMultiline:{
        height:176,
        width:'100%',
        justifyContent: 'center',
        marginTop: '2%',
        backgroundColor: '#F6E9DF'

    },

    txt:{
        fontFamily:"Nunito_300Light",
        paddingTop: '2%',
        paddingLeft:'2%',
        textAlign: 'left',
        fontSize:30
    },

    textTags:{
        fontFamily:"Nunito_600SemiBold",
        paddingLeft:'2%',
        textAlign: 'left',
        fontSize:15
    },

    name:{
        fontFamily:"Nunito_400Regular_Italic",
        paddingTop: '2%',
        paddingLeft:'2%',
        textAlign: 'left',
        fontSize: 25
    },

    imagePerfil:{
        alignItems: 'center'
    },

    headerText:{
        fontFamily: 'Nunito_700Bold',
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        paddingLeft: '2%',
        paddingBottom: '1%'
    },
    
    switch:{
        marginTop:15
    },

    icon: {
        marginLeft: 5   
    },

});