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

//Back-end Imports
import axios from 'axios';

//Import Images
import Pen from '../../../assets/pen.png'; 
import Place_Holder from '../../../assets/Place_Holder.png';

// async function Submit (data, specieid) {
//     await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data).then(resp => console.log(resp.data)).catch(err => console.log(err));
// }

async function Logout( navigation ){
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('pet');
    navigation.navigate('StackLogin', {screen: 'Login'});
}

export default function PetPerfil({ navigation }) {
    //Import Fonts
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

    const[petName, onChangePetName] = React.useState("");
    const[animal, onChangeAnimal] = React.useState("");
    const[race, onChangeRace] = React.useState("");
    const[petAge, onChangePetAge] = React.useState("");
    const[petAgeBefore, onChangePetAgeBefore] = React.useState("");
    const[social, onChangeSocial] = React.useState("");

    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = React.useState({});

    const [species, setSpecies] = React.useState([]);

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

    //console.log(isEnabled);
    };
    const screenHeight = Dimensions.get('window').height;
     

    return(
    <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>
        {!loadingUser && !loadingPet && <>
        <View style={{flex: 0.9}}>
            <ScrollView>

                <View>
                    <Text style={styles.headerText}>Perfil</Text>
                </View>

                <View style={styles.imagePerfil}>
                    <ImageBackground source={Place_Holder} style={{ resizeMode:"contain", width: 180, height: 180}}>
                        <TouchableOpacity style={ styles.inputImage } onPress={()=>navigation.navigate('ProfileAdd')}>
                            <Image source={Pen} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/>       
                        </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />}
                    </ImageBackground>
                </View>
                
                <View style={{paddingTop:'2%', paddingBottom: '2%', alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Nome do Dono</Text>
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    value={user['name']}
                    disabled
                    />
                </View>

                <View style={{alignSelf:'center', width:'90%', borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Nome do Pet</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    disabled
                    value={petName}
                    />
                </View>
                
                <View style={{alignSelf:'center', width:'90%',borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Animal</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    value={animal}
                    disabled
                    />            
                </View>

                <View style={{alignSelf:'center', width:'90%', borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.text}>Raça</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    disabled
                    keyboardType={'default'}
                    placeholder="Digite a raça do seu Pet"
                    onChangeText={onChangeRace}
                    value={race}
                    onChange={(e) => setData({...data, 'race': e.target.value})}
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
                    placeholder={petAgeBefore}
                    value={petAge}
                    onChangeText={(petAge)=> onChangePetAge(petAge)}
                    onChange={(e) => setData({...data, 'age': petAge})}/>
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
                    onChange={(e) => setData({...data, 'petSocialMedia': e.target.value})}/>
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
                        <MaterialIcons style={[styles.icon,{ width: 20 }]} name="logout" size={40} color="white" />
                        <Text style={styles.text, {fontFamily: 'Nunito_700Bold', color:'white', fontSize: 20, textAlign:'left', paddingLeft:35, justifyContent: 'center', alignSelf:'center' }}>Logout</Text>      
                    </TouchableOpacity>
                </View>

                <View style={styles.containerInput}>
                    <TouchableOpacity 
                        style={styles.inputOwner}
                        onPress={()=>navigation.navigate('ProfileOwner')}>
                        <Image source={Place_Holder} style={[styles.icon,{ width: 35, height: 35 }]}/>
                        <Text style={styles.text, {fontFamily: 'Nunito_700Bold', color:"white", fontSize: 20, textAlign:'left', paddingLeft:20, alignSelf:'center'}}>Dono</Text>
                    </TouchableOpacity>
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
        fontFamily: 'Nunito_700Bold',
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: '3%',
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