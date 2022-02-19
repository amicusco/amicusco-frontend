import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tag } from '../../Components/Tags'

import Camera from '../../assets/camera.png';
import Place_Holder from '../../assets/Place_Holder.png';
import logo from '../../assets/logo.png';  

import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
} from '@expo-google-fonts/nunito'

async function Submit (petId, data, tags, navigation) {
    data = {...data, tags}; 
    await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${petId}`, data).then(resp => navigation.navigate('StackMain', {screen: 'Main'})).catch(err => console.log(err));
}

export default function PetAdd({ navigation }) {
    //import fonts
    let [fontsLoaded]=useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold,
    })
    //configurações do banco
    const [data, setData] = useState({});

    //Funções para tags de interesse
    const [interests, setInterests] = useState([]);
    
    const [selectedInterests, setSelectedInterests] = useState([]);

    const [pet, setPet] = useState(null);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Funções para adicionar imagens
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingInterests, setLoadingInterests] = useState(false);
    
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
            setPet(JSON.parse(await AsyncStorage.getItem('pet')));
            setLoading(true);
        }
        getPet()

        const getInterests = async () => {
            let tags = await axios.get("https://amicusco-pet-api.herokuapp.com/tag");
            setInterests(tags.data);
            setLoadingInterests(true);
        }
        getInterests();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    };

    return(
    <ScrollView style={styles.container}>
        {loading && loadingInterests &&<>
        <View>
            <Text style={styles.headerText}>Informações Adicionais de Perfil</Text>
        </View>
        
        <View style={styles.imagePerfil}>
            <ImageBackground source={image === null ? Place_Holder: image} style={{ resizeMode:"contain", width: 180,height: 180}}>
                <TouchableOpacity style={ styles.inputImage} onPress={pickImage}>
                    <Image source={Camera} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/> 
                    <View/>      
                </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, borderBottomLeftRadius: 180, borderBottomRightRadius: 180,
  borderTopRightRadius: 180, borderTopLeftRadius: 180, overflow: 'hidden' }} />}
            </ImageBackground>
        </View>
        
        <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/>  

        <View style={styles.containerInput}>
            <Text style={styles.name}>{pet['name']}</Text>  
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Sobre: </Text>  
            <TextInput
            style={styles.inputMultiline}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite uma breve descrição do seu pet"
            onSubmitEditing={true}
            autoComplete={false}
            underlineColor='#ffffff'
            multiline={true}
            onChangeText={(e) => setData({...data, 'description': e})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <Text style={[styles.txt, {paddingLeft: '4%'}]}>Interesses: </Text>    
        <View style={[styles.containerTags]}>
            {interests.map((interest, index) => {
            return(
            <Tag style={styles.tags} key={index} selectedInterests = {selectedInterests} setSelectedInterests={setSelectedInterests} tag={interest}/>    
            )
        })}  
                       
        </View>
        
        <View style={[styles.containerInput, {paddingBottom: '5%'}]}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => Submit(pet['id'], data, selectedInterests, navigation)}>
            <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
            <Text style={styles.inputSubmitButtonTxt}>Cadastrar Informações Adicionais</Text> 
            <Text style={styles.txt}></Text>     
        </TouchableOpacity>
        </View>
        </>}
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
        marginBottom: '4%',
        paddingHorizontal: '3%',

    },

    containerTags: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        paddingHorizontal: '3%',
        paddingBottom: '5%'
    },

    input: {
        height: 46,
        width:'100%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: '5%',
        backgroundColor: '#F6E9DF'
    },

    tags: {
        height: 46,
        width:'100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: '2%'
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'3%',
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
        height: 40,
        width: 40,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    inputMultiline:{
        height: 176,
        width:'100%',
        justifyContent: 'flex-start',
        marginTop: '2%',
        paddingLeft: '3%',
        borderRadius: 10,
        backgroundColor: '#F6E9DF'
    },

    txt:{
        padding: '2%',
        textAlign: 'left',
        fontFamily: 'Nunito_400Regular',
        fontSize: 20 
    },

    name:{
        paddingTop: '5%',
        fontFamily:'Nunito_400Regular_Italic',
        textAlign: 'left',
        fontSize: 30
    },

    imagePerfil:{
        alignItems: 'center'
    },

    headerText:{
        fontSize:30,
        fontFamily:'Nunito_700Bold' ,
        paddingLeft: '5%',
        paddingTop: '10%',
        paddingBottom: '5%'
    },
    
    switch:{
        marginTop: '5%'
    },

    icon: {
        marginLeft: '2%'   
    },

});