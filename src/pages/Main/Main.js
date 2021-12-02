import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-deck-swiper';

import logo from '../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons"
import Place_Holder from '../../assets/Place_Holder.png'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'

export default function Main({ navigation }) {

    const screenHeight = Dimensions.get('window').height;
    // const id = navigation.getParam('user');
    const [pets, setPets] = React.useState([{name:"Amarelinho", bio:"Legal pra caramba, ashahsh ahshahash hashh ashash hash ashhas ashdhash hasdhha shd hashdhash ahhasdh hdahash hah sahhah ahhash hahha ha hah ha"},{name:"Amarelinho2", bio:"2Legal pra caramba, ashahsh ahshahash hashh ashash hash ashhas ashdhash hasdhha shd hashdhash ahhasdh hdahash hah sahhah ahhash hahha ha hah ha"}]);

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

          <View> 
          <LinearGradient
          locations={[0,0.3,1]}
          colors = {['#65D2EB', '#87E9FF', '#E8C9AE']}
          style = {{height:(screenHeight/2), borderRadius:"10%"}}>  
 
            <TouchableOpacity>
              <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

          </LinearGradient>          

          <View style={[styles.cardContainer,{marginTop:-((screenHeight/2))}]}>
          
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

      </View>

      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={[styles.button, {width:40, height:40}]} onPress={() => deck.current.swipeBack()}>
            {/* <Image style={{ width: 30, height: 25}} source={backcard} /> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeLeft()} > 
            <Image style={{ width: 28, height: 28}} source={dislike} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeRight()}>
            <Image style={{ width: 30, height: 25}} source={like} />
          </TouchableOpacity>

      </View>

      <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingVertical:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
      
      <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:'1%'}}>
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
      marginTop: 20,
      marginBottom: 20,
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
      maxHeight: 400
    },
  
    card: {
      borderWidth: 1,
      borderColor: '#9E612B',
      borderRadius: 8,
      margin: 20,
      overflow: 'hidden',
      backgroundColor: '#FFF',
    },

    avatar: {
      flex: 1,
      height: 300,
      width: 300,
      alignSelf:'center'
    },
  
    footer: {
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
  
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  
    bio: {
      fontSize: 14,
      color: '#999',
      marginTop: 5,
      lineHeight: 18,
    },
  
    buttonsContainer: {
      flexDirection: 'row',
      paddingBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      bottom: -30, 
      

    },
  
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    }

});