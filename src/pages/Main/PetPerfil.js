import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import face from '../../assets/face@3x.png'; 

async function Submit (data) {
    await axios.post("https://amicusco-auth.herokuapp.com/user", data).then(resp => console.log(resp.data)).catch(err => console.log(err));
}

export default function PetPerfil({ navigation }) {
    // 
    const [data, setData] = React.useState({});
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         sliderValue: 1,
    //     };
    // }
    
    console.log(data);
    return(
    <ScrollView style={styles.container}>
        <View>
            <Text style={styles.headerText}>Perfil</Text>
        </View>

        <View style={styles.imagePerfil}>
            <Image source={face} style={{resizeMode:"contain", width: 230, height: 160 }} />
        </View>
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#E8C9AE', borderBottomWidth: 3}}/> 

        <View style={styles.containerInput}>
            <Text style={styles.txt}>Nome Completo</Text>
            <Text style={styles.txt}>Rahul Roy</Text>  
        </View>

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
            <Text style={styles.txt}>Distância Máxima</Text>
            {/* <Text style={[styles.txt, paddingLeft: 10]}>{this.state.sliderValue}</Text> */}
            <Slider 
            style={{width: '90%', height: '4%', paddingTop: 10}}
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
        
        <View style={{alignSelf:'center', width:'90%', backgroundColor: '#ffffff' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/> 
        
        <View style={styles.containerInput}>
        <TouchableOpacity 
            //Quando o botão fizer duas coisas é so chamar em sequencia onPress
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
    },

    imagePerfil:{
        borderRadius: 360,
        alignItems: 'center'
    },

    headerText:{
        adjustsFontSizeToFit:true,
        maxFontSizeMultiplier:'100',
        fontSize:40,
        fontWeight:'bold',
        paddingLeft: 20
    }
});