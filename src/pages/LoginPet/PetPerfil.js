import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Switch, Picker} from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';

import Place_Holder from '../../assets/Place_Holder.png'; 
import Camera from '../../assets/camera.png'; 


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

    const [isMale, setIsMale] = useState(false);
    const toggleSwitch = () => setIsMale(previousState => !previousState);
    
    const [data, setData] = React.useState({});

    console.log(data);

    const [species, setSpecies] = React.useState([]);

    const [image, setImage] = useState(null);

    const [dist, setDist] = useState(1);

    const [value, setGender] = useState({});

    const [userName, setUserName] = useState(null);

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

    //console.log(isEnabled);
    };

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
            <Text style={styles.txt}>Nome Completo</Text>
            <Text style={styles.txt}>{userName}</Text>  
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Pet</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o nome do Pet"
            onChange={(e) => setData({...data, 'name': e.target.value})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Animal</Text>
            <Picker
                onValueChange={(itemValue) => setData({...data, 'specie': itemValue})}
            >
                <Picker.Item label="Selecione o Animal" />
                {species.map((el, index) => (
                    <Picker.Item label={el.specie} value={el.id} key={index} />
                ))}
            </Picker>           
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Raça</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder="Digite a raça do seu Pet"
            onChange={(e) => setData({...data, 'breed': e.target.value})}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a idade do seu pet"
            onChange={(e) => setData({...data, 'age': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Digite o link da rede social do seu Pet"
            onChange={(e) => setData({...data, 'petSocialMedia': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Sexo do Pet</Text>
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
            style={styles.inputSubmitButton}
            onPress={() => Submit(data, 1, navigation)}>  
            <Text style={styles.inputSubmitButtonTxt}>Cadastrar</Text>     
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
        marginTop: 20
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
        textAlign: 'left'
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: 20
    },
    
    switch:{
        marginTop:15
    }
});