//react imports
import React, { useState, useEffect } from 'react';
import { ImageBackground, View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, Button} from 'react-native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

import raul from '../../../assets/raul.png';
import logo from '../../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 

//import fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

//Back-end Imports
import axios from 'axios';

//Import Images
import Pen from '../../../assets/pen.png'; 
import Place_Holder from '../../../assets/Place_Holder.png';

async function Submit (data, petid, setPet) {
    var pet = JSON.parse(await AsyncStorage.getItem('pet'));
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

async function Logout( navigation ){
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pet');
    navigation.navigate('StackLogin', {screen: 'Login'});
}

export default function PetPerfil({ navigation }) {
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold,
    })

    const [petId, onChangePetId] = useState("");
    const [petName, onChangePetName] = useState("");
    const [animal, onChangeAnimal] = useState("");
    const [race, onChangeRace] = useState("");
    const [petAge, onChangePetAge] = useState("");
    const [petAgeBefore, onChangePetAgeBefore] = useState("");
    const [social, onChangeSocial] = useState("");

    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = useState({});

    const [species, setSpecies] = useState([]);

    const [image, setImage] = useState(null);

    const [dist, setDist] = useState(1);
    const [value, setGender] = useState({});
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [pet, setPet] = useState(null);
    const [loadingPet, setLoadingPet] = useState(true);

    const radioProps = [
        { label: 'Machos', value: 0 },
        { label: 'Fêmeas', value: 1 },
        { label: 'Ambos', value: 2 }];
   

    useEffect(() => {
        const GetSpecies = async () => {
            let resp = await axios.get("https://amicusco-pet-api.herokuapp.com/species");
            setSpecies(resp.data);
        }
      
        GetSpecies();
        const getUser = async() => {
            let userData = JSON.parse(await AsyncStorage.getItem('user'));
            setUser(userData)
            setLoadingUser(false);

        }
        getUser();

        const getPet = async() => {
            let petData = JSON.parse(await AsyncStorage.getItem('pet'));
            let age = Number(petData['age'])
            setPet(petData);
            onChangePetId(petData['id']);
            onChangePetName(petData['name']);
            onChangePetAgeBefore(age);
            onChangeRace(petData['breed']);
            onChangeAnimal(petData['specie_pet']['specie']);
            setLoadingPet(false);
        }
        getPet();

      }, []);

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
    const screenHeight = Dimensions.get('window').height;

    function checkOnChange(type, value){
        console.log(value);
        if (type === "petAge"){
            onChangePetAge(value);
            setData({...data, 'age': value});
        }
        if (type === "petSocial"){
            onChangeSocial(value);
            setData({...data, 'petSocial': value});

        }
    }

 
    return(
    <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>
        {!loadingUser && !loadingPet && <>
        <View style={{flex: 0.9}}>
            <ScrollView>

                <View>
                    <Text style={styles.headerText}>Perfil</Text>
                </View>
                <View style={styles.imagePerfil}>
                    <ImageBackground source={image === null ? Place_Holder: image} style={{ resizeMode:"contain", width: 180,height: 180}}>
                        <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                                <Image source={Pen} style={{ resizeMode:"contain", width:'75%', height:'75%'}}/>       
                        </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, borderBottomLeftRadius: 180, borderBottomRightRadius: 180,
  borderTopRightRadius: 180, borderTopLeftRadius: 180, overflow: 'hidden'}} />}
                    </ImageBackground>
                </View>
                
                <View style={{paddingTop:'2%', paddingBottom: '2%', alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Nome do Dono</Text>
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    placeholder={user['name']}
                    placeholderTextColor= {"#1C1C1C"} 
                    disabled
                    />
                </View>

                <View style={{alignSelf:'center', width:'90%', borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Nome do Pet</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    disabled
                    placeholder={petName}
                    placeholderTextColor= {"#1C1C1C"} 
                    />
                </View>
                
                <View style={{alignSelf:'center', width:'90%',borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Animal</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    placeholder={animal}
                    placeholderTextColor= {"#1C1C1C"} 
                    disabled
                    />            
                </View>

                <View style={{alignSelf:'center', width:'90%', borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Raça</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    disabled
                    placeholder={race}
                    placeholderTextColor= {"#1C1C1C"} 
                    />
                </View>

                <View style={{alignSelf:'center', width:'90%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Idade:</Text>  
                    <TextInputMask
                    style={styles.input}
                    type={ 'custom' }
                    keyboardType={'numeric'}
                    options={{mask:'99'}}
                    placeholder={pet['age'].toString()}
                    value={petAge}
                    onChangeText={(petAge)=> checkOnChange("petAge", petAge)}
                    />
                </View>
            
                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Rede Social:</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'url'}
                    placeholder="Digite o link da rede social do seu Pet"
                    onChangeText={onChangeSocial}
                    value={social}
                    onChangeText={(social)=> checkOnChange("petSocial",social)}/>
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Encontrar Pets</Text>  
                    <RadioForm
                        buttonColor="#E8C9AE"
                        buttonSize={15}
                        radioStyle={{paddingLeft:25, paddingTop:25}}
                        selectedButtonColor="#E8C9AE"
                        radio_props={radioProps}
                        initial={2}
                        animation={true}
                        formHorizontal={true}
                        onPress={(value) => setGender(value)}
                        />
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Distância Máxima</Text>
                    <Text style={{paddingLeft:10, fontSize: 15}}>{dist} Km</Text>
                    <Slider 
                    style={{width: '100%', height: '5%', paddingTop: 10}}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    minimumTrackTintColor="#E8C9AE"
                    maximumTrackTintColor="#999999"
                    thumbTintColor="#E8C9AE"
                    value={dist}
                    onValueChange={value => setDist(value)}
                    />  
                </View>

                <View style={styles.containerInput}>
                    <TouchableOpacity 
                        style={styles.inputOwner}
                        onPress={()=>Logout(navigation)}>
                        <MaterialIcons style={[styles.icon]} name="logout" size={40} color="white" />
                        <Text style={styles.text, {fontFamily: 'Nunito_700Bold', color:'white', fontSize: 20, textAlign:'left', paddingLeft:'5%', justifyContent: 'center', alignSelf:'center' }}>Logout</Text>      
                    </TouchableOpacity>
                </View>

                <View style={styles.containerInput}>
                    <TouchableOpacity 
                        style={styles.inputOwner}
                        onPress={()=>navigation.navigate('ProfileOwner')}>
                        <Image source={Place_Holder} style={[styles.icon,{ width: 35, height: 35 }]}/>
                        <Text style={styles.text, {fontFamily: 'Nunito_700Bold', color:"white", fontSize: 20, textAlign:'left', paddingLeft:'5%', alignSelf:'center'}}>{user['name'].split(" ")[0]}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.containerInput,{paddingBottom:'15%'}]}>
                    
                    <TouchableOpacity 
                        style={styles.inputSubmitButton}
                        onPress={() => Submit(data, petId, setPet)}
                        >
                        <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]} />
    
                        <Text style={[styles.inputSubmitButtonTxt,{paddingLeft:'3%'}]}>Atualizar informações</Text>
                        <Text style={styles.txt}></Text>     
                    </TouchableOpacity>
                    
                </View>

            </ScrollView>
        </View>     

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
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
        marginBottom: '5%',
        paddingHorizontal: '2%'
    },

    input: {
        height: 46,
        width:'100%',
        fontFamily: 'Nunito_300Light',
        fontSize: 16,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: '2%',
        paddingLeft:'2%',
        backgroundColor: '#F6E9DF'
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },

    inputSubmitButtonTxt: {
        fontFamily:'Nunito_700Bold',
        fontSize:20,
        color: 'white',
        fontWeight:'bold'
    },

    inputImage:{
        writingDirection: 'ltr',
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        backgroundColor: '#65D2EB',
        borderRadius: 360,
        height: 40,
        width: 40,
        alignItems: 'center', 
        justifyContent: 'center'
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        fontFamily: 'Nunito_400Regular',
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: '3%',
        paddingTop:'5%'
    },
    
    switch:{
        marginTop:15
    },

    inputOwner: {
        height: 46,
        width: '70%',
        alignSelf: 'center',
        fontSize: 20,
        backgroundColor: '#E8C9AE',
        borderRadius: 40,
        marginTop:'2%',
        paddingLeft:'3%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },

    text: {
        color: '#111',
        fontSize: 20,
        textAlign: 'left',
        fontFamily:'Nunito_600SemiBold',
        paddingTop:'5%'
        },

    icon: {
        justifyContent: 'center',
        alignSelf:'center'   
    },
});