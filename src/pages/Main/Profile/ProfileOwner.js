import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, Modal, Pressable, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

import Place_Holder from '../../../assets/Place_Holder.png'; 
import raul from '../../../assets/raul.png'; 
import Camera from '../../../assets/camera.png'; 

import ModalApp from '../../../Components/Modal';
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

async function Submit (data, userid, navigation) {
    await axios.put(`https://amicusco-auth.herokuapp.com/users/${userId}`, data)
    .then(resp => {
        console.log(resp.data);
        navigation.navigate('StackMain', {screen: 'Profile'});
    })
    .catch(err => console.log(err));
}

function Validation (password1, password2, setModal){
    if (!!password1 && !!password2){
        if (password1 === password2) setModal(true);
        else return "Senhas diferentes!";
    } else return "";
}

const getPetsUser = async (userId, setLoading) => {
    try{
        const resp = await axios.get(`https://amicusco-pet-api.herokuapp.com/petsbyuser/${userId}`);
        setLoading(false);
        return resp.data;
    } catch(err) {
        console.log(err);
        return err;
    }
}


export default function ProfileOwner({ navigation }) {
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
    });
    
    const[userId, onChangeUserId] = useState(null);
    const[name, onChangeName] = useState('');
    const[age, onChangeAge] = useState('');
    const[email, onChangeEmail] = useState('');
    const[phone, onChangePhone] = useState('');
    const[password, onChangePassword] = useState('');
    const[pets, setPets] = useState([]);
    const[loadingUser, setLoadingUser] = useState(true);
    const[loadingPet, setLoadingPet] = useState(true);
    const[newPassword1, setnewPassword1] = useState('');
    const[newPassword2, setnewPassword2] = useState('');

    // pets[0]['Name']
    // pats.map(pet => (<Text>{pet['name']}</Text>))
    const [data, setData] = useState({});

    const [image, setImage] = useState(null);

    console.log(userId);

    useEffect(() => {
        const getUser = async() => {
            let user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log(user);
            onChangeUserId(user['id']);
            onChangeName(user['name']);
            onChangeEmail(user['email']);
            onChangePhone(user['phoneNumber']);
            onChangePassword(user['password']);
            setLoadingUser(false);                
        }
        getUser();

        
    }, []);

    useEffect(() => {
        if(!!userId)
            getPetsUser(userId, setLoadingPet).then(resp => setPets(resp));
    }, [!!userId])

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

    const screenHeight = Dimensions.get('window').height;

    console.log("USER LOADING: ", loadingUser);
    console.log("PET LOADING: ",loadingPet);

    return(
    <View style={{height: screenHeight, borderRadius:50, backgroundColor:'#ffffff'}}>
        {!loadingUser && !loadingPet && <>
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

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Trocar senha</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="Digite a sua nova senha"
                    secureTextEntry={true}
                    value={newPassword1}
                    onChangeText={setnewPassword1} />
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Digite novamente</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="Digite novamente a sua senha"
                    secureTextEntry={true}
                    value={newPassword2}
                    onChangeText={setnewPassword2} />
                </View>

                <ModalApp/>
                    
                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Senha para confirmar as alterações</Text>  
                    <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="Digite a sua senha"
                    secureTextEntry={true}
                    onChangeText={onChangePassword} />
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
        </>}
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