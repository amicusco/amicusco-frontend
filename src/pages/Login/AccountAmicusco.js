import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

async function Submit (data) {
    await axios.post("https://amicusco-auth.herokuapp.com/user", data).then(resp => console.log(resp.data)).catch(err => console.log(err));
}

export default function AccountAmicusco({ navigation }) {
    //Bruno, faz diferença eu criar varaiveis dentro dessa constante? ajuda a gente a fazer as verificações para o front.
    const [data, setData] = React.useState({});

    console.log(data);
    return(
    <ScrollView style={styles.container}>
        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo:</Text>  
            <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'default'}
            placeholder="Digite o seu nome completo"
            onChange={(e) => setData({...data, 'name': e.target.value})} 
            />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Idade:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Digite a sua idade"
            //onChange={(e) => setData({...data, 'idade': e.target.value})}
            />            
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Rede Social (opcional):</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'url'}
            placeholder="Deixe o link de alguma rede social"
            //onChange={(e) => setData({...data, 'rede_social': e.target.value})}
            />
        </View>

        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 


        <View style={styles.containerInput}>
            <Text style={styles.txt}>Telefone:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'name-phone-pad'}
            placeholder="Digite o seu telefone"
            onChange={(e) => setData({...data, 'numberPhone': e.target.value})}/>
        </View>

        <View style={{alignSelf:'center', width:'90%', paddingHorizontal:5, backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>E-mail:</Text>  
            <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            placeholder="Digite o seu e-mail"
            onChange={(e) => setData({...data, 'email': e.target.value})}/>
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Senha:</Text>  
            <TextInput
            //colocar possibilidade de ver a senha
            style={styles.input}
            keyboardType={'password'}
            secureTextEntry={true}
            placeholder="Digite a sua senha"
            onChange={(e) => setData({...data, 'password': e.target.value})}/>
        </View>
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            //Quando o botão fizer duas coisas é so chamar em sequencia onPress
            style={styles.inputSubmitButton}
            onPress={() => {Submit(data); navigation.navigate('StackMain', {screen: 'PetLogin'})}}> 
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