import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import Place_Holder from '../../../assets/Place_Holder.png'; 
import raul from '../../../assets/raul.png'; 
import Camera from '../../../assets/camera.png'; 


// async function Submit (data, specieid) {
//     await axios.post(`https://amicusco-pet-api.herokuapp.com/specie/${specieid}/pet`, data).then(resp => console.log(resp.data)).catch(err => console.log(err));
// }


export default function ProfileOwner({ navigation }) {

    const[name, onChangeName] = React.useState("Rahul Roy");
    const[age, onChangeAge] = React.useState("28 anos");
    const[email, onChangeEmail] = React.useState("rahul.roy@gmail.com");
    const[social, onChangeSocial] = React.useState("fb.com/rahulroy");
    const[phone, onChangePhone] = React.useState("(11)99374-2234");
    
    const [data, setData] = React.useState({});

    console.log(data);

    const [image, setImage] = useState(null);
   

    // useEffect(() => {
    //     const GetSpecies = async () => {
    //         let resp = await axios.get("https://amicusco-pet-api.herokuapp.com/species");
    //         setSpecies(resp.data);
    //     }
      
    //     GetSpecies();

    //   }, []);

    // console.log(species);

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

    const screenHeight = Dimensions.get('window').height;

    return(
    <View style={{height: screenHeight, borderRadius:50, backgroundColor:'#ffffff'}}>
        <View style={{flex: 0.9}}>
            <ScrollView>
                <View>
                    <Text style={styles.headerText}>Perfil do Dono</Text>
                </View>

                <View style={styles.imagePerfil}>
                    <ImageBackground source={raul} style={{ resizeMode:"contain", width: 120, height: 120}}>
                        <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                            <Image source={Camera} style={{ resizeMode:"contain", width:'75%', height:'75%' }}/>       
                        </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />}
                    </ImageBackground>
                </View>
                
                <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Nome Completo</Text>
                    <TextInput
                    style={styles.input}
                    autoFocus={true}
                    keyboardType={'default'}
                    placeholder="Digite o seu nome completo"
                    value={name}
                    onChangeText={onChangeName}
                    onChange={(e) => setData({...data, 'ownerName': e.target.value})} 
                    />  
                </View>

                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Idade</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Digite a idade do seu pet"
                    value={age}
                    onChangeText={onChangeAge}
                    onChange={(e) => setData({...data, 'age': e.target.value})}/>
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Rede Social</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'url'}
                    placeholder="Digite o link da sua rede social"
                    value={social}
                    onChangeText={onChangeSocial}
                    onChange={(e) => setData({...data, 'ownerSocialMedia': e.target.value})}/>
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Telefone</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Digite a idade do seu pet"
                    value={phone}
                    onChangeText={onChangePhone}
                    onChange={(e) => setData({...data, 'phone': e.target.value})}/>
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>E-mail</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'email-address'}
                    placeholder="Digite o seu e-mail"
                    value={email}
                    onChangeText={onChangeEmail}
                    onChange={(e) => setData({...data, 'email': e.target.value})}/>
                </View>
            </ScrollView>
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:5 ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:10}}>
          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"blue", alignItems: "center",justifyContent:"center", width:"25%"}}
              onPress={() => navigation.navigate('Main')}>   
              <Text>Main</Text>
          </TouchableOpacity>  

          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"blue", alignItems: "center",justifyContent:"center", width:"25%"}}
              onPress={() => navigation.navigate('Chat')}>   
              <Text>Chat</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:"#F4F4F4", alignItems: "center",justifyContent:"center", width:"25%"}}
              disabled
              onPress={() => navigation.navigate('Profile')}>   
              <Text>Profile</Text>
          </TouchableOpacity>
         
        </View>


    </View>  
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        borderRadius:50,
        backgroundColor:'#ffffff',
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
    
});