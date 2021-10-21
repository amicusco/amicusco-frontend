//react imports
import React, { useState, useEffect } from 'react';
import { ImageBackground, View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions} from 'react-native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';

import raul from '../../../assets/raul.png'

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

    const[petName, onChangePetName] = React.useState("Batatinha");
    const[animal, onChangeAnimal] = React.useState("Cachorro");
    const[race, onChangeRace] = React.useState("Vira-lata");
    const[age, onChangeAge] = React.useState("8 anos");
    const[social, onChangeSocial] = React.useState("fb.com/amarelinho");

    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = React.useState({});

    console.log(data);

    const [species, setSpecies] = React.useState([]);

    const [image, setImage] = useState(null);

    const [dist, setDist] = useState(1);

    const [value, setGender] = useState({});

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

      }, []);

    console.log(species);

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    //console.log(isEnabled);
    };
    //não ta funfando tão bem assim
    const screenHeight = Dimensions.get('window').height -30;
     

    return(
    <ScrollView style={{height: screenHeight, borderRadius:50, backgroundColor:'#ffffff'}}>
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
        
        <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Dono</Text>
            <Text style={styles.txt}> Rahul Roy</Text>
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Pet</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o nome do Pet"
            
            //isso daqui faz com que tenha ja tenha texto escrito na box do input
            value={petName}
            onChangeText={onChangePetName}
            onChange={(e) => setData({...data, 'petName': e.target.value})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Animal</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder="Digite que animal é o seu Pet"
            value={animal}
            onChangeText={onChangeAnimal}
            onChange={(e) => setData({...data, 'animal': e.target.value})}
            />            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Raça</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder="Digite a raça do seu Pet"
            onChangeText={onChangeRace}
            value={race}
            onChange={(e) => setData({...data, 'race': e.target.value})}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a idade do seu pet"
            onChangeText={onChangeAge}
            value={age}
            onChange={(e) => setData({...data, 'age': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Digite o link da rede social do seu Pet"
            onChangeText={onChangeSocial}
            value={social}
            onChange={(e) => setData({...data, 'petSocialMedia': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Encontrar Pets</Text>  
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

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Distância Máxima</Text>
            <Text style={[styles.txt, {paddingLeft:10}]}>{dist} Km</Text>
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
                <Text style={styles.text}>Logout</Text>      
            </TouchableOpacity>
        </View>

        <View style={styles.containerInput}>
            <TouchableOpacity 
                style={styles.inputOwner}
                onPress={()=>navigation.navigate('ProfileOwner')}>
                <Image source={raul} style={[styles.icon,{ width: 35, height: 35 }]}/>
                <Text style={styles.text}>Dono</Text>
                <Text style={styles.text}></Text>      
            </TouchableOpacity>
        </View>
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
        marginBottom: 50,
        paddingHorizontal: 15

    },

    input: {
        height: 46,
        width:'100%',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: 20
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
        marginTop: 20,
        marginBottom: 20
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

    txt:{
        paddingTop: 20,
        textAlign: 'left',
        fontFamily:"Nunito-Light"
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: 20,
    },
    
    switch:{
        marginTop:15
    },

    inputOwner: {
        height: 46,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: '#E8C9AE',
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
        textAlign: 'center',
        fontFamily:"Nunito-Light"
        },

    icon: {
        marginLeft: 5   
    },
});