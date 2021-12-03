import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';

import logo from '../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import Place_Holder from '../../assets/Place_Holder.png'


export default function Main({ navigation }) {

    const screenHeight = Dimensions.get('window').height + StatusBar.currentHeight;
    // const id = navigation.getParam('user');
    const [pets, setPets] = React.useState([{name:"Amarelinho", bio:"Leagal pra caramba, ashahsh ahshahash hashh ashash hash ashhas ashdhash hasdhha shd hashdhash ahhasdh hdahash hah sahhah ahhash hahha ha hah ha"},{name:"Amarelinho2", bio:"2Legal pra caramba, ashahsh ahshahash hashh ashash hash ashhas ashdhash hasdhha shd hashdhash ahhasdh hdahash hah sahhah ahhash hahha ha hah ha"}]);

    const deck = React.useRef();

  

    // useEffect(() => {
    //   async function loadUsers() {
    //     const response = await api.get('/devs', {
    //       headers: {
    //         user: id,
    //       }
    //     })

    //     setUsers(response.data);
    //   }

    //   loadUsers();
    // }, [id]);

    // async function handleLike() {
    //   const [user, ...rest] = users;

    //   await api.post(`/devs/${user._id}/likes`, null, {
    //     headers: { user: id },
    //   })

    //   setUsers(rest);
    // }

    // async function handleDislike() {
    //   const [user, ...rest] = users;

    //   await api.post(`/devs/${user._id}/dislikes`, null, {
    //     headers: { user: id },
    //   })

    //   setUsers(rest);
    // }

    return (
      <View style={[{height:screenHeight},styles.container]}>

        <View style={{flex: 0.9}}>
 
            <TouchableOpacity>
              <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

          

          <View style={[styles.cardContainer,{marginTop:1}]}>
          
            {/* //  Depois de integrar as imagens : <Image style={styles.avatar} source={{ uri: pet.avatar }} />  */}
            <Swiper
            stackSize={3}
            cards={pets}
            verticalSwipe={false}
            ref={deck}
            swipeBackCard

            renderCard={(pet)=>{
              return(
                <View style={styles.card}>

                  <Image style={styles.avatar} source={Place_Holder} />
                  <View style={styles.footer}>
                    <Text style={styles.name}> {pet.name} </Text>
                    <Text style={styles.bio} numberOfLines={3}> {pet.bio} </Text>
                  </View>

                </View>
              )
            }}/>

          </View>
            
        </View>

      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={[styles.button, {width:40, height:40}]} onPress={() => deck.current.swipeBack()}>
          <Entypo name="back" size={24} color="#FF9601" />
        </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeLeft()} > 
            <Entypo name="cross" size={50} color="#fe5167" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeRight()}>
            <AntDesign name="heart" size={28} color="#36e8b8" />
          </TouchableOpacity>

      </View>

      <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingVertical:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
      
      <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", paddingTop:'1%'}}>
        <TouchableOpacity 
            style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:40, height:40}}
            disabled
            onPress={() => navigation.navigate('Main')}>   
            <Image source={logo} style={ {width: 30, height: 30}} />
        </TouchableOpacity>  

        <TouchableOpacity 
            style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
            onPress={() => navigation.navigate('Chat')}>   
            <Ionicons name="chatbubbles-outline" size={30} color='#E8C9AE'/>
        </TouchableOpacity>

        <TouchableOpacity 
            style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
            onPress={() => navigation.navigate('Profile')}>   
            <Ionicons name="person-circle-outline" size={35} color='#E8C9AE'/>
        </TouchableOpacity>
        
      </View>

    </View>
    );
  }

  const styles = StyleSheet.create({

    container: {
      backgroundColor:'#ffffff'

    },

    logo: {
      marginTop: "10%",
      marginBottom: "1%",
      width: 50,
      height: 50,
      alignSelf:'center',
    },

    empty: {
      alignSelf: 'center',
      color: '#999',
      fontSize: 24,
      fontWeight: 'bold'
    },
  
    cardContainer: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#FFF',
      //maxHeight: 400
    },
  
    card: {
      borderWidth: 1,
      borderColor: '#9E612B',
      borderRadius: 8,
      margin: "5%",
      overflow: 'hidden',
      backgroundColor: '#FFF',
    },

    avatar: {
      //flex: 1,
      height: 300,
      width: 300,
      alignSelf:'center',
    },
  
    footer: {
      backgroundColor: '#FFF',
      paddingHorizontal: "5%",
      paddingVertical: "4%",
    },
  
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  
    bio: {
      fontSize: 14,
      color: '#999',
      marginTop: "2%",
      lineHeight: 18,
    },
  
    buttonsContainer: {
      flexDirection: 'row',
      paddingBottom: "2%",
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: "1%",
      bottom: "-4%", 
      

    },
  
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: "5%",
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    }

});