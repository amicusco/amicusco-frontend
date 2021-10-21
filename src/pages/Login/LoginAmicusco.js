import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import RadioForm from 'react-native-simple-radio-button';
import index from '../../index.js';

//
async function Submit (data, navigation) {
    await axios.post("https://amicusco-auth.herokuapp.com/login", data).then(resp => {
        AsyncStorage.setItem('user', JSON.stringify(resp.data));
        navigation.navigate('StackLoginPet', {screen: 'PetLogin'});
    }).catch(err => {
        console.log(err);
        alert(err);
    });
}


export default function LoginAmicusco({ navigation }){ 

    const [data, setData] = React.useState({
        password: '',
        isValidUser: true,
        isValidPassword: true,
    });

    const [type, setType] = React.useState('');

    const radioProps = [
        { label: 'E-mail', value: 'email' },
        { label: 'Telefone', value: 'phoneNumber' }];

    return(
    <View styles={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Selecione a sua forma de Login</Text>  
            <RadioForm
                buttonColor="#E8C9AE"
                buttonSize={15}
                radioStyle={{paddingLeft:25, paddingTop:25}}
                selectedButtonColor="#E8C9AE"
                radio_props={radioProps}
                initial={1}
                animation={true}
                formHorizontal={true}
                onPress={value => setType(value)}
                />
        </View>

    
        <View style={styles.containerInput}>
            <Text style={styles.txt}>{type === 'email' ? 'E-mail' : 'Número de Telefone'}</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            autoCompleteType={type === 'email' ? 'email' : 'number'}
            placeholder={type === 'email' ? 'Digite o seu E-mail' : 'Digite o seu Telefone'}
            //Fica para depois para colocar a expressão regular
            onChange={(e) => setData(
                type === 'email' ? {...data, 'email': e.target.value } : {...data, 'phoneNumber': e.target.value }
            )} />
        </View>

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'default'}
            secureTextEntry={true}
            placeholder="Digite a sua senha"
            onChange={(e) => setData({...data, 'password': e.target.value})} />
        </View>

        <View style={styles.containerInput}>
        <TouchableOpacity 
            style={styles.inputSubmitButton}
            onPress={() => {Submit(data, navigation)}}>
            <Text style={styles.inputSubmitButtonTxt}>Entrar</Text>     
        </TouchableOpacity>
        </View>

    </View>
    )}

const styles = StyleSheet.create({

    container: {
        flex:1,
        borderRadius:50,
        backgroundColor:'#ffffff'
    },

    containerInput: {
        justifyContent: 'flex-end',
        marginBottom: 30,
        paddingHorizontal: 15

    },

    input: {
        height: 46,
        width:'90%',
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
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    inputSubmitButtonTxt: {
        color: "white",
        fontWeight:'bold'
    },

    txt:{
        paddingTop: 20,
        textAlign: 'left'
    }
});