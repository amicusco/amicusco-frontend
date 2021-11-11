import React, { useState, useEffect } from 'react';
import { ImageBackground,View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, Modal, Pressable, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInputMask} from 'react-native-masked-text';

import Place_Holder from '../../../assets/Place_Holder.png'; 
import Camera from '../../../assets/camera.png'; 
import logo from '../../../assets/logo.png';
import {Ionicons} from "@expo/vector-icons";

//import fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
  } from '@expo-google-fonts/nunito'

async function Submit (data, userId, navigation) {
    await axios.put(`https://amicusco-auth.herokuapp.com/users/${userId}`, data)
    .then(resp => {
        alert("Dados alterados!");
        navigation.navigate('StackMain', {screen: 'ProfileOwner'});
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

function checkFields(data, navigation, pass, password, userId, setError) {
    console.log(data)
    if (pass == password){
        if (data['name']){
            if (data['name']==''|| data['name']==null){
                return alert("Insira o seu nome");

            }}
        else if (data['age']){    
            if (data['age']=='' || data['age']==null){
                return alert("Insira a sua idade");
            }}
        else if (data['phoneNumber']){
            if (data['phoneNumber']=='' || data['phoneNumber']==null || data['phoneNumber'].length < 10){
            return alert("Insira um telefone");
        }}
       
        console.log("entrou")
        setError(false);
        Submit(data, userId, navigation);
        
    }
    else {
        setError(true);
    }
}

export default function ProfileOwner({ navigation }) {
    //Import Fonts
    let [fontsLoaded]=useFonts({
        Nunito_300Light,
        Nunito_400Regular,
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
    // const[newPassword1, setnewPassword1] = useState('');
    // const[newPassword2, setnewPassword2] = useState('');

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
            onChangeAge(user['age']);
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

    
    const [newPass1, setnewPass1] = React.useState('');
    const [newPass2, setnewPass2] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [hidenewPass1, sethidenewPass1] = React.useState(true);
    const [hidenewPass2, sethidenewPass2] = React.useState(true);
    const [hidePass, sethidePass] = React.useState(true);
    const [error, setError] = React.useState('');

    function checkOnChange(type, value){
        console.log(value);
        if (type === "name"){
            const newValue = value.replace(/[^A-Za-z ]/g, '');
            onChangeName(newValue);
            setData({...data, 'name': newValue});
        }
        if (type === "age"){
            onChangeAge(value);
            setData({...data, 'age': value});
        }
        if (type === "phone"){
            const newValue = value.replace(/[^\d]/g, "");
            onChangePhone(newValue);
            setData({...data, 'phoneNumber': newValue});
        }
       
    }

    return(
    <View style={{height: screenHeight, backgroundColor:'#ffffff'}}>
        {!loadingUser && !loadingPet && <>
        <View style={{flex: 0.9}}>
            <ScrollView>
                <View>
                    <Text style={styles.headerText}>Perfil do Dono</Text>
                </View>

                <View style={styles.imagePerfil}>
                    <ImageBackground source={Place_Holder} style={{ resizeMode:"contain", width: 240, height: 240}}>
                        <TouchableOpacity style={ styles.inputImage } onPress={pickImage}>
                            <Image source={Camera} style={{ resizeMode:"contain", width:'60%', height:'60%' }}/>       
                        </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />}
                    </ImageBackground>
                </View>
                
                <View style={{paddingTop:20, alignSelf:'center', width:'100%',borderBottomColor: '#E8C9AE', borderBottomWidth: 5}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Nome Completo:</Text>
                    <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="   Digite o seu nome completo"
                    value={name}
                    onChangeText={(name)=> checkOnChange("name", name)} 
                    />  
                </View>

                <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Idade:</Text>  
                    <TextInputMask
                    style={styles.input}
                    type={ 'custom' }
                    keyboardType={'numeric'}
                    placeholder="   Digite a sua idade"
                    options={{mask:'99'}}
                    value={age}
                    onChangeText={(age)=> checkOnChange("age", age)}
                    />
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Telefone:</Text>  
                    <TextInputMask
                    style={styles.input}
                    type={'cel-phone'}
                    keyboardType={'phone-pad'}
                    placeholder={'   Digite o seu Telefone'}
                    value={phone}
                    options={{maskType:'BRL', withDDD: true, dddMask: '   (99) '}}
                    onChangeText={(phone)=> checkOnChange("phone", phone)}
                    />
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>

                <View style={styles.containerInput}>
                    <Text style={styles.txt}>E-mail:</Text>  
                    <TextInput
                    style={[styles.input,{backgroundColor:"#F2F2F2", borderColor:"#F2F2F2"}]}
                    value={email}
                    disabled/>
                </View>

                <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>
                    
                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Senha para confirmar alterações:</Text>
                    <View style={[styles.input,{flexDirection:'row', alignItems:'center'}]}>   
                        <TextInput
                        style={{width:'100%', height: 46, paddingHorizontal:10, borderColor: error === true ? 'red' : ''}}
                        keyboardType={'default'}
                        placeholder="   Digite a sua senha"
                        onChangeText={(pass) => setPass(pass)}
                        secureTextEntry={hidePass}
                        value={pass}
                        />
                        <TouchableOpacity onPress={() => sethidePass(!hidePass)} style={{paddingHorizontal:"5%", alignItems:'center', justifyContent:'center', width:'15%'}}>
                            <Ionicons name="eye" size={22} color='#111'/>
                        </TouchableOpacity>
                    </View>
                    {error === true && <Text style={{color: 'red', paddingTop:2}}>Senha incorreta!</Text>}
                </View>

                <View style={styles.containerInput}>
                    
                    <TouchableOpacity 
                        style={[styles.inputSubmitButton,{backgroundColor:'#F6E9DF', width:'60%', alignSelf:'center', justifyContent:'flex-start'}]}
                        onPress={() => navigation.navigate('ProfilePass')}
                        >
                        <Ionicons name="key" size={40} color="white" style={styles.icon} />
    
                        <Text style={styles.inputSubmitButtonTxt}>Alterar senha</Text>
                        <Text style={styles.txt}></Text>     
                    </TouchableOpacity>

                </View>

                <View style={styles.containerInput}>
                    
                    <TouchableOpacity 
                        style={styles.inputSubmitButton}
                        onPress={() => checkFields(data, navigation, pass, password, userId, setError)} // arrumar o envio das informações
                        >
                        <Image source={logo} style={[styles.icon,{ width: 35, height: 35,alignSelf:'center' }]} />
    
                        <Text style={[styles.inputSubmitButtonTxt,{paddingLeft:'3%'}]}>Atualizar informações</Text>
                        <Text style={styles.txt}></Text>     
                    </TouchableOpacity>
                    
                </View>

                
            </ScrollView>
        </View>

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:5 ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  

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
        backgroundColor:'#ffffff',
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: '10%',
        padding:"2%"

    },

    input: {
        height: 46,
        width:'100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        marginTop: '2%',
        backgroundColor: '#F6E9DF'
    },

    inputSubmitButton: {
        height: 46,
        width: "100%",
        alignSelf:'center',
        backgroundColor: '#65D2EB',
        borderRadius: 40,
        marginTop:'3%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },

    inputSubmitButtonTxt: {
        color: 'white',
        fontFamily:'Nunito_400Regular',
        fontSize: 20,
        fontWeight:'bold',
        justifyContent:'center'
    },

    inputImage:{
        writingDirection: 'ltr',
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        backgroundColor: '#65D2EB',
        borderRadius: 360,
        height: '30%',
        width: '30%',
        alignItems: 'center', 
        justifyContent: 'center'
    },

    txt:{
        paddingTop: '2%',
        fontFamily: 'Nunito_400Regular',
        textAlign: 'left'
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: '2%'
    },

    icon: {
        marginLeft: '1%',
        justifyContent: 'flex-start',
        alignSelf:'flex-start' 
    },
});