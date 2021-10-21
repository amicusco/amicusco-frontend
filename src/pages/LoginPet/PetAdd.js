import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import Camera from '../../assets/camera.png';
import Place_Holder from '../../assets/Place_Holder.png';  


async function Submit (petId, data) {
    console.log(petId);
    await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${petId}`, data).then(resp => console.log(resp.data)).catch(err => console.log(err));
}

export default function PetAdd({ navigation }) {
    //console.log(isEnabled);

    //configurações do banco
    const [data, setData] = useState({});

    //Funções para tags de interesse
    const [interests, setInterests] = useState(["1","2"]);

    const [pet, setPet] = useState(null);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Funções para adicionar imagens
    const [image, setImage] = useState(Place_Holder);

    const [loading, setLoading] = useState(false);

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
    }, []);

    console.log(pet);

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
        {loading && <>
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

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Interesses</Text>
            {interests.map((interest, index) => {
            return(
            <TouchableOpacity style={styles.input} key={index} onPress={setInterests}>
                <Text style={styles.text}>{interest}</Text>
                <Text style={styles.text}></Text>      
            </TouchableOpacity>
            )
        })}  
                       
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => Submit(pet['id'], data)}>
            <Text style={styles.inputSubmitButtonTxt}>Cadastrar Informações Adicionais</Text>     
        </TouchableOpacity>
        </View>
        </>}
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
        marginBottom: '4%',
        paddingHorizontal: '1%'

    },

    input: {
        height: 46,
        width:'100%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: '2%'
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%'
    },

    inputSubmitButtonTxt: {
        color: 'white',
        fontWeight:'bold'
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
        paddingTop: '2%',
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

});