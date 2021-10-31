//react imports
import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

//import fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic 
  } from '@expo-google-fonts/nunito'

//back-end import
import axios from 'axios';

import Camera from '../../../assets/camera.png';
import Place_Holder from '../../../assets/Place_Holder.png';  
import logo from '../../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons"


// async function Submit (data, specieid) {
//     await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data).then(resp => console.log(resp.data)).catch(err => console.log(err));
// }


export default function PetAdd({ navigation }) {
    //import fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_300Light_Italic,
        Nunito_400Regular,
        Nunito_400Regular_Italic,
        Nunito_600SemiBold,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold,
        Nunito_700Bold_Italic,
        Nunito_800ExtraBold,
        Nunito_800ExtraBold_Italic,
        Nunito_900Black,
        Nunito_900Black_Italic 
    })
    
    //console.log(isEnabled);

    //configurações do banco
    const [data, setData] = React.useState({});
    console.log(data);

    //Funções para tags de interesse
    const [interests, setInterests] = React.useState(["Ração","Passear na Praia", "Banho", "Brincar", "Escovar o pelo"]);
    const [listInterests, setListInterests]=React.useState([]);

    const[bio, onChangeBio] = React.useState("Sou felpudinho");
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Funções para adicionar imagens
    const [image, setImage] = useState(Place_Holder);

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
    <View style={{height: screenHeight, borderRadius:50, backgroundColor:'#ffffff'}}>
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
                    <Text style={styles.name}>Amarelinho</Text>  
                </View>

                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Sobre</Text>  
                    <TextInput
                    style={styles.inputMultiline}
                    autoFocus={true}
                    value={bio}
                    keyboardType={'default'}
                    placeholder="Digite uma breve descrição do seu pet"
                    onSubmitEditing={true}
                    autoComplete={false}
                    underlineColor='#ffffff'
                    multiline={true}
                    onChangeText={onChangeBio}
                    onChange={(e) => setData({...data, 'petDescription': e.target.value})} 
                    />
                </View>
                
                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Interesses</Text>

                    {interests.map((interest, index) => {
                    return(
                    
                    //Lista de interesses
                    <TouchableOpacity style={styles.input} key={index} onPress={()=>{
                        if (listInterests.indexOf(interest) === -1){
                            setListInterests([...listInterests, interest]);
                        }
                        }}>
                        <Text style={styles.textTags}> {interest} </Text>   
                    </TouchableOpacity>
                    )
                })}
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
        marginTop:'2%',
        marginBottom: '3%',
        paddingHorizontal: 15

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
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 80
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

});