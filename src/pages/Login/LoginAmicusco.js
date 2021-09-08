import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

async function Submit (data) {
    //console.log("qualquer coisa")
    await axios.post("https://amicusco-auth.herokuapp.com/login", data).then(resp => console.log(resp.data)).catch(err => console.error(err));
}


export default function LoginAmicusco({ navigation }){
    const [data, setData] = React.useState({
        password: '',
        email: '',
        isValidUser: true,
        isValidPassword: true,
    });

    return(
    <View styles={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'email-address'}
            autoCompleteType={'email'}
            placeholder="Digite o seu e-mail"
            //Fica para depois para colocar a expressão regular
            onChange={(e) => setData({...data, 'email': e.target.value})} />
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
            onPress={() => {Submit(data); navigation.navigate('StackMain', {screen: 'PetLogin'})}}>
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