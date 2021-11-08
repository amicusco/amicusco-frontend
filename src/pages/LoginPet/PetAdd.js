import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tag } from '../../Components/Tags'

import Camera from '../../assets/camera.png';
import Place_Holder from '../../assets/Place_Holder.png';
import logo from '../../assets/logo.png';  


async function Submit (petId, data, tags, navigation) {
    data = {...data, tags}; 
    await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${petId}`, data).then(resp => navigation.navigate('StackMain', {screen: 'Main'})).catch(err => console.log(err));
}

export default function PetAdd({ navigation }) {
    //console.log(isEnabled);

    //configurações do banco
    const [data, setData] = useState({});

    //Funções para tags de interesse
    const [interests, setInterests] = useState([]);
    
    const [selectedInterests, setSelectedInterests] = useState([]);

    const [pet, setPet] = useState(null);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //Funções para adicionar imagens
    const [image, setImage] = useState(Place_Holder);

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

    console.log(interests);

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

    return(
    <ScrollView style={styles.container}>
        {loading && loadingInterests &&<>
        <View>
            <Text style={styles.headerText}>Informações Adicionais de Perfil</Text>
        </View>
        
        {/* Tem que arrumar a inserção de imagem por causa do background */}
        <View style={styles.imagePerfil}>
            <ImageBackground style={{ resizeMode:"contain", width: '100%', height: 200}}>
                <TouchableOpacity style={ styles.inputImage} onPress={pickImage}>
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
            <Text style={styles.txt}>Sobre</Text>  
            <TextInput
            style={styles.inputMultiline}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite uma breve descrição do seu pet"
            onSubmitEditing={true}
            autoComplete={false}
            underlineColor='#ffffff'
            multiline={true}
            onChange={(e) => setData({...data, 'description': e.target.value})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <Text style={styles.txt}>Interesses</Text>    
        <View style={styles.containerTags}>
            {interests.map((interest, index) => {
            return(
            <Tag style={styles.tags} key={index} setInterests={()=>setSelectedInterests([...selectedInterests, interest['id']])} tagText={interest['tag']}/>    
            )
        })}  
                       
        </View>
        
        <View style={styles.containerInput}>
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
        paddingHorizontal: '1%'

    },

    containerTags: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
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
        marginTop: '2%'

    },

    txt:{
        padding: '2%',
        textAlign: 'left'
    },

    name:{
        paddingTop: 20,
        textAlign: 'left',
        fontSize: 25
    },

    imagePerfil:{
        alignItems: 'center'
    },

    headerText:{
        fontSize:30,
        fontWeight:'bold',
        paddingLeft: 20,
        paddingBottom: 10
    },
    
    switch:{
        marginTop:15
    },

    icon: {
        marginLeft: 5   
    },

});