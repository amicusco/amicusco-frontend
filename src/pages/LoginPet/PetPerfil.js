import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Switch, Picker, TouchableOpacityBase} from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';

import Place_Holder from '../../assets/Place_Holder.png'; 
import Camera from '../../assets/camera.png'; 
import logo from '../../assets/logo.png';

//Import Fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

async function Submit (data, specieid, navigation, species) {
    try{
        const userId = JSON.parse(await AsyncStorage.getItem('user'))['id'];
        data = {...data, userId};
        const resp = await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data);
        species.forEach(specie => {
            if (resp.data['specieId']==specie['id'])
                resp.data['specie_pet'] = {'specie': specie['specie']} 
        });
       
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
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold,
    })

    //Data
    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = useState({'gender':'F'});
    const [species, setSpecies] = useState([]);
    const [image, setImage] = useState(null);
    const [dist, setDist] = useState(1);
    const [gender, setGender] = useState({});
    const [userName, setUserName] = useState(null);
    const [petName, setPetName] = useState('');
    const [petRace, setPetRace] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petSocial, setPetSocial] = useState('');
    const [preference, setPreference] = useState(2);

    const [error, setError] = useState('');

    const[itemValue, setItemValue]=useState()


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


    if (!result.cancelled) {
      setImage(result.uri);
    }
    };

    function checkFields(data, navigation) {
         if (petName=='' || petName==null){
            setError("Insira o nome do seu amiguinho");
    
        }
        else if (data['specie'] === undefined || data['specie'] === '-1'){
            setError("Selecione o que é o seu amiguinho");
    
        }
        else if (petRace==''|| petRace==null){
            setError("Insira a raça do seu amiguinho");
    
        }
        else if (petAge=='' || petAge == null){
            setError("Insira a idade do seu amiguinho");
    
        }
        else {
            Submit(data, data['specie'], navigation, species);
        }
    }

    function checkOnChange(type, value){
        console.log(value);
        if (type === "petName"){
            const newValue = value.replace(/[^A-Za-z ]/g, '');
            setPetName(newValue);
            setData({...data, 'name': newValue});
        }
        if (type === "petAge"){
            const newValue = value.replace(/[^\d]/g, "");
            setPetAge(newValue);
            setData({...data, 'age': newValue});
        }
       
        if (type === "petSocial"){
            setPetSocial(value);
            setData({...data, 'petSocial': value});

        }
        if (type === "petRace"){
            const newValue = value.replace(/[^A-Za-z ]/g, '');
            setPetRace(newValue);
            setData({...data, 'breed': newValue});

        }
    }

    return(
    <ScrollView style={styles.container}>
        <View>
            <Text style={styles.headerText}>Perfil</Text>
        </View>

        <View style={styles.imagePerfil}>
            <ImageBackground source={image === null ? Place_Holder: image} style={{ resizeMode:"contain", width: 120, height: 120}}>
                <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                    <Image source={Camera} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/>       
                </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, borderBottomLeftRadius: 180, borderBottomRightRadius: 180,
  borderTopRightRadius: 180, borderTopLeftRadius: 180, overflow: 'hidden' }} />}
            </ImageBackground>
        </View>
        
        <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>
            <TextInput style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
            editable={false}
            placeholder={'   '+userName}
            placeholderTextColor= {"#1C1C1C"} 
            disabled
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Pet:</Text>  
            <TextInput
            style={[styles.input,{borderColor: error.includes("nome") ? 'red' : ''}]}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="   Digite o nome do Pet"
            value={petName}
            onChangeText={(petName)=>checkOnChange('petName', petName)}
            />
            {error.includes("nome") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>}  
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Animal:</Text>
                <View style={[styles.input, {paddingBottom:'5%'}]}>
                    <Picker 
                        style={[styles.input]}
                        onValueChange={(itemValue) => setData({...data, 'specie': itemValue}, setItemValue(itemValue))}
                        selectedValue={itemValue}
                        itemStyle={[styles.input, {fontFamily:'Nunito_400Regular'}]}
                    >   
                        <Picker.Item style={[{fontFamily:'Nunito_400Regular', fontSize: 18}]} label="Selecione o Animal" value={-1}/>
                        {species.map((el, index) => (
                            <Picker.Item label={el.specie} value={el.id} key={index}/>
                        ))}
                    </Picker>
                </View>
            
            {error.includes("Selecione") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>}            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Raça:</Text>  
            <TextInput
            style={[styles.input, {borderColor: error.includes("raça") ? 'red' : ''}]}
            keyboardType={'default'}
            placeholder="   Digite a raça do seu Pet"
            value={petRace}
            onChangeText={(petRace)=>checkOnChange('petRace', petRace)}
            />
            {error.includes("raça") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>} 
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInputMask
            style={[styles.input,{borderColor: error.includes("idade") ? 'red' : ''}]}
            type={ 'custom' }
            keyboardType={'numeric'}
            placeholder="   Digite a idade do seu pet"
            options={{mask:'99'}}
            value={petAge}
            onChangeText={(petAge)=> checkOnChange('petAge', petAge)}/>
            {error.includes("idade") && <Text style={{color: 'red', paddingTop:2}}>{error}</Text>} 
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="   Digite o link da rede social do seu Pet"
            value={petSocial}
            onChangeText={(petSocial)=> checkOnChange('petSocial', petSocial)}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Sexo do Pet:</Text>
            <View style={{flexDirection:'row'}}>
                <Switch
                style = {styles.switch, {paddingLeft: '2%', paddingTop:'2%'}}
                disabled = {false}
                trackColor={{ false: "#ffc0cb", true: "#a3ceef"  }}
                thumbColor={isMale ? "#000fff"  : "#ff007f"}
                onValueChange={()=>{toggleSwitch(); setData({...data, 'gender': isMale ? "F" : "M"})}}
                value={isMale}/>
                <Text style={[styles.txt, { fontSize:16, paddingLeft:'4%', paddingTop:'5%' }]}>{isMale ? "Macho" : "Fêmea"}</Text>
            </View>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={[styles.txt, {paddingBottom: '10%'}]}>Encontrar Pets:</Text>  
            <RadioForm
                  buttonColor="#E8C9AE"
                  buttonSize={15}
                  radioStyle={{marginLeft:'7%'}}
                  labelStyle={{fontFamily:'Nunito_400Regular', fontSize:17}}
                  selectedButtonColor="#E8C9AE"
                  radio_props={radioProps}
                  initial={2}
                  animation={true}
                  formHorizontal={true}
                  onPress={(value) => setData({...data, 'preference': value})}
                />
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Distância Máxima:</Text>
            <Text style={[styles.txt, {paddingLeft:'1%', paddingBottom:'5%'}]}>{dist} Km</Text>
            <Slider 
            style={{width: '100%'}}
            minimumValue={1}
            maximumValue={50}
            step={1}
            minimumTrackTintColor="#E8C9AE"
            maximumTrackTintColor="#999999"
            thumbTintColor="#E8C9AE"
            value={dist}
            onValueChange={(value) => { setData({...data, 'distance': value}); setDist(value)}}
            />  
        </View>
        
        <View style={[styles.containerInput, {paddingBottom: '20%'}]}>
            <TouchableOpacity 
                style={styles.inputSubmitButton}
                onPress={() => checkFields(data, navigation)}>  
                <Image source={logo} style={[styles.icon,{ width: 35, height: 35 }]}/>
                <Text style={styles.inputSubmitButtonTxt}>Cadastrar</Text>
                <Text style={[styles.txt,{alignSelf:'flex-end'}]}></Text>     
            </TouchableOpacity>
        </View>
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
        marginBottom: '9%',
        paddingHorizontal: '3%'

    },

    input: {
        height: 46,
        width:'100%',
        fontSize: 18,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: '5%',
        backgroundColor: '#F6E9DF'
    },

    inputSubmitButton: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    inputSubmitButtonTxt: {
        color: 'white',
        fontSize: 20,
        paddingRight:'8%',
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
        paddingTop: '5%',
        fontSize:20,
        fontFamily:'Nunito_400Regular',
        textAlign: 'left'
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        paddingTop:'10%',
        fontSize:40,
        fontWeight:'bold',
        fontFamily:'Nunito_300Light',
        paddingLeft: '5%'
    },
    
    switch:{
        marginTop:'15%'
    },

    icon: {
        marginLeft: '2%'   
    },
});