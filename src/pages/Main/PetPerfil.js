import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';

import Place_Holder from '../../assets/Place_Holder.png'; 
import Camera from '../../assets/camera.png'; 

async function Submit (data, specieid) {
    await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data).then(resp => console.log(resp.data)).catch(err => console.log(err));
}


export default function PetPerfil({ navigation }) {


    // 
    const [data, setData] = React.useState({});

    const [species, setSpecies] = React.useState([]);
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         sliderValue: 1,
    //     };
    // }
    
    console.log(data);

    const [image, setImage] = useState(null);

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
        
        <View style={{paddingTop:20, alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#E8C9AE', borderBottomWidth: 3}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo</Text>
            <Text style={styles.txt}>Rahul Roy</Text>  
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome do Pet</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o nome do Pet"
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
            onChange={(e) => setData({...data, 'race': e.target.value})}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 


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
            <Text style={styles.txt}>Sexo</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder="Selecione o sexo do pet"
            onChange={(e) => setData({...data, 'petSex': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Distância Máxima</Text>
            {/* <Text style={[styles.txt, paddingLeft: 10]}>{this.state.sliderValue}</Text> */}
            <Slider 
            style={{width: '100%', height: '5%', paddingTop: 10}}
            minimumValue={1}
            maximumValue={50}
            step={1}
            minimumTrackTintColor="#E8C9AE"
            maximumTrackTintColor="#999999"
            thumbTintColor="#E8C9AE"
            // value={this.state.sliderValue}
            // onValueChange={value => this.setState({sliderValue: value})}
            />  
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => Submit(data)}
            onPress={()=>navigation.navigate('StackMain', {screen: 'PetLogin'})}>  
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
        direction: 'ltr',
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
    }
});