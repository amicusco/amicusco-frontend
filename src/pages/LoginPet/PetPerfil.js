import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Switch, Picker, TouchableOpacityBase} from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInputMask } from 'react-native-masked-text';

import Place_Holder from '../../assets/Place_Holder.png'; 
import Camera from '../../assets/camera.png'; 
import logo from '../../assets/logo.png';

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

async function Submit (data, specieid, navigation) {
    try{
        const userId = JSON.parse(await AsyncStorage.getItem('user'))['id'];
        data = {...data, userId};
        console.log(data);
        const resp = await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data);
        await AsyncStorage.setItem('pet', JSON.stringify(resp.data));
        navigation.navigate('PetAdd');

    }catch(err) {
        console.log(err);
    }
}

export default function PetPerfil({ navigation }) { 
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_600SemiBold,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold,
    })

    //Data
    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = React.useState({});
    const [species, setSpecies] = React.useState([]);
    const [image, setImage] = useState(null);
    const [dist, setDist] = useState(1);
    const [gender, setGender] = useState({});
    const [userName, setUserName] = useState(null);
    const [petName, setPetName] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petAge, setPetAge] = useState('');

    const [error, setError] = useState('');

    const radioProps = [
        { label: 'Machos', value: 0 },
        { label: 'Fêmeas', value: 1 },
        { label: 'Ambos', value: 2 }];
   
    
    useEffect(() => {
        const GetSpecies = async () => {
            let resp = await axios.get("https://amicusco-pet-api.herokuapp.com/species");
            setSpecies(resp.data);
        }

        const GetName = async () => {
            setUserName(JSON.parse(await AsyncStorage.getItem('user'))['name']);
        }
      
        GetSpecies();
        GetName();

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    };

    function checkFields(data, navigation) {
        if (image==''){
            setError("Insira uma foto do seu amiguinho");
    
        }
        else if (petName==''){
            setError("Insira o nome do seu amiguinho");
    
        }
        else if (petRace==''){
            setError("Insira a raça do seu amiguinho");
    
        }
        else if (petAge==''){
            setError("Insira a idade do seu amiguinho");
    
        }
        else if (data['specie'] === undefined || data['specie'] === '-1'){
            setError("Selecione o que é o seu amiguinho");
    
        }
        else {
            Submit(data, data['specie'], navigation);
        }
    }

    console.log(error);

    return(
    <ScrollView style={styles.container}>
        <View>
            <Text style={styles.headerText}>Perfil</Text>
        </View>

        <View style={styles.imagePerfil}>
            <ImageBackground source={Place_Holder} style={{ resizeMode:"contain", width: 120, height: 120}}>
                <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                    <Image source={Camera} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/>       
                </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />}
            </ImageBackground>
        </View>
        
        <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>
            <TextInput style={[styles.input,{backgroundColor:"#FFFF", borderColor:"#FFFF"}]}
            editable={false}
            value={userName}
            disabled
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Pet:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="   Digite o nome do Pet"
            value={petName}
            onChangeText={(petName)=>setPetName(petName.replace(/[^A-Za-z ]/g, ''))}
            onChange={(e) => setData({...data, 'name': e.target.value})} 
            />
            {error.includes("nome") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>}  
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Animal:</Text>
            <Picker style={styles.input}
                onValueChange={(itemValue) => setData({...data, 'specie': itemValue})}
            >
                <Picker.Item label="Selecione o Animal" value={-1}/>
                {species.map((el, index) => (
                    <Picker.Item label={el.specie} value={el.id} key={index} />
                ))}
            </Picker>
            {error.includes("Selecione") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>}            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Raça:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder="Digite a raça do seu Pet"
            value={petRace}
            onChangeText={(petRace)=>setPetRace(petRace.replace(/[^A-Za-z ]/g, ''))}
            onChange={(e) => setData({...data, 'breed': e.target.value})}
            />
            {error.includes("raça") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>} 
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInputMask
            style={styles.input}
            type={ 'custom' }
            keyboardType={'numeric'}
            placeholder="Digite a idade do seu pet"
            options={{mask:'99'}}
            value={petAge}
            onChangeText={(petAge)=> setPetAge(petAge)}
            onChange={(e) => setData({...data, 'age': e.target.value})}/>
            {error.includes("idade") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>} 
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Digite o link da rede social do seu Pet"
            onChange={(e) => setData({...data, 'petSocialMedia': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Sexo do Pet:</Text>
            <Switch
            style = {styles.switch}
            disabled = {false}
            trackColor={{ false: "#ffc0cb", true: "#a3ceef"  }}
            thumbColor={isMale ? "#000fff"  : "#ff007f"}
            onValueChange={toggleSwitch}
            onChange={() => setData({...data, 'gender': isMale ? "M" : "F"})}
            value={isMale}/>
            <Text style={styles.txt}>{isMale ? "Macho" : "Fêmea"}</Text>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Encontrar Pets:</Text>  
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
            <Text style={styles.txt}>Distância Máxima:</Text>
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
                style={styles.inputSubmitButton}
                onPress={() => checkFields(data, navigation)}>  
                <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
                <Text style={styles.inputSubmitButtonTxt}>Cadastrar</Text>
                <Text style={styles.txt}></Text>     
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
        fontFamily:'Nunito_200Light',
        textAlign: 'left'
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        fontSize:40,
        fontWeight:'bold',
        fontFamily:'Nunito_300Light',
        paddingLeft: 20
    },
    
    switch:{
        marginTop:15
    },

    icon: {
        marginLeft: 5   
    },
});