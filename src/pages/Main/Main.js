import * as React from 'react';
import { useEffect, useState } from 'react'; 
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar, TouchableOpacityBase } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';
import * as Location from 'expo-location';


import logo from '../../assets/logo.png'
import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import Place_Holder from '../../assets/Place_Holder.png';
import itsamatch from '../../assets/itsamatch.png';
import axios from 'axios';
import {v4} from 'uuid';

//import fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'


import { GetImageOrder } from '../../Components/GetImages.js';


export default function Main({ navigation }) {
    let [fontsLoaded]=useFonts({
      Nunito_300Light,
      Nunito_400Regular,
      Nunito_600SemiBold,
      Nunito_700Bold,
    })

    const screenHeight = Dimensions.get('window').height + StatusBar.currentHeight;
    // const id = navigation.getParam('user');
    const [pets, setPets] = React.useState([]);
    const [likes, setLikes] = React.useState([]);

    const deck = React.useRef();

    const [matchPet, setMatchPet] = React.useState(false);
    const [superMatchPet, setSuperMatchPet] = React.useState(false);
    const [petLike, setPetLike] = React.useState(null);
    const [myPet, setMyPet] = React.useState(null);
    const [idx, setIdx] = React.useState(null);
 
    const [limit, setLimit] = React.useState(10);
    const [preference, setPreference] = React.useState(0);
    const [species, setSpecies] = React.useState(1); //0- 1-cachorro 2-gato 3-cavalo

    const [swipedAll, setSwipedAll] = React.useState(false);
    const [loading, setLoading] = useState(true); 
    const [loadingLike, setLoadingLike] = useState(true); 

    useEffect(() => {
      async function loadPets() {
        try{
          let myPet = JSON.parse(await AsyncStorage.getItem('pet'));
          setMyPet(myPet);
          setPreference(myPet['Preference']);
          setSpecies(myPet['Specie']);

          const resp = await axios.get(`https://amicusco-pet-api.herokuapp.com/pets?limit=${limit}&preference=${preference}&latitude=${myPet.latitude}&longitude=${myPet.longitude}&distance=${myPet.distance}`);

         
          setPets(resp.data.filter(el => el.id != myPet.id));
          setLoading(false);
          
          
        }catch(err){
          console.log(err);
          setLoading(false);
        }
      }
      loadPets();
    }, []);

    useEffect(() => {
      async function loadLikes() {
        try{ 
          const resp = await axios.get(`https://amicusco-pet-api.herokuapp.com/like/all`);
          var likeIds = [];
          var myPetLikes = [];
          
          resp.data.forEach(element => {
            if (element.petLikeId == myPet.id){
              myPetLikes.push(element);
            }
            if (element.petId == myPet.id){
              likeIds.push(element.petLikeId);
            }           
          });
          //console.log(likeIds);
          var filterPets = pets.filter(element =>!likeIds.includes(element.id));
          setPets(filterPets);         
          setLikes(myPetLikes);
          setLoadingLike(false);

          AsyncStorage.setItem('likes', JSON.stringify(myPetLikes));
          AsyncStorage.setItem('pets', JSON.stringify(pets));

        }catch(err){
          console.log(err);
        } 
      }
      if(!loading){
        loadLikes();
      }
    }, [loading]);

    // useEffect(() => {
    //   const getPet = async() => {
    //     let petData = JSON.parse(await AsyncStorage.getItem('pet'));
    //     setPet(petData);
    //   }
    //   getPet();
    // }, []);


    async function LikeDislike (indexPet, superLike = false) {
      try{
        // PetlikeId = Pet que recebeu
        var chatId = v4();
        let petLikeId = pets[indexPet].id;
        const likeNow = await axios.post(`https://amicusco-pet-api.herokuapp.com/like/${myPet.id}`, { petLikeId, superLike,chatId });
        setLikes([...likes, likeNow.data]);
        for (var i  = 0; i < likes.length; i++){
          if (likes[i].petId == petLikeId){
            setIdx(indexPet);
            if (likes[i].superLike){
              setSuperMatchPet(true);
            } else{
              setMatchPet(true);
            }
            await axios.put(`https://amicusco-pet-api.herokuapp.com/like/${likes[i].id}`, { 'match': true, chatId });
            // Não funcionou
            var likeData = likeNow.data;
            axios.put(`https://amicusco-pet-api.herokuapp.com/like/${likeData.id}`, { 'match': true, chatId });
            break;
          }
        }; 
      }catch(err){
        console.error(err);
      }
    }

    useEffect(() => {
        if (myPet){    
          (async () => {
                  let permissionStatus = null;
                  if (Platform.OS === 'ios') {
                      let {status} = await Permissions.askAsync(Permissions.LOCATION);
                      permissionStatus = status;
                  } else {
                      let {status} = await Location.requestBackgroundPermissionsAsync();
                      permissionStatus = status;
                  }
                  if (permissionStatus !== 'granted') {
                    alert("É necessario autorizar a geolocalização");  
                    return;
                  }
                  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

                  var data = {'latitude':location.coords.latitude, 'longitude':location.coords.longitude}
                  try{
                    const resp = await axios.put(`https://amicusco-pet-api.herokuapp.com/pets/${myPet.id}`, data);
                  }
                  catch(err){
                    console.log(err);
                  }
              })();}
        }, [myPet]);

    return (
      <View style={[{height:screenHeight},styles.container]}>
        {loading && <Text style={{textAlign: 'center'}}>Carregando...</Text>}
        
        {!loadingLike &&
        //gambiarra para resolver o tamanho da tela
        <View style={{flex: 0.88}}>
          {screenHeight > 650 ?   
          <TouchableOpacity>
            <Image style={styles.logo} source={logo} />
          </TouchableOpacity> 
          : 
          null}
          
          
          {!swipedAll && pets.length > 0 ?
          <View style={[styles.cardContainer,{marginTop:1}]}>
            {/* //  Depois de integrar as imagens : <Image style={styles.avatar} source={{ uri: pet.avatar }} />  */}
            <Swiper
            stackSize={3}
            cards={pets}
            verticalSwipe={true}
            ref={deck}
            swipeBackCard
            animateOverlayLabelsOpacity
            animateCardOpacity
            disableTopSwipe = {true}
            onSwipedAll={() =>  setSwipedAll(true)}
            onSwipedRight = {(index) => LikeDislike(index)}
            onSwipedBottom = {(index) => LikeDislike(index, true)}
            // onSwipedTop = {disableTop}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: "#fe5167",
                    color: "white",
                    fontSize:16
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: '10%',
                    marginLeft: '-10%'
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: "#36e8b8",
                    color: "white",
                    fontSize:16
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: '10%',
                    marginLeft: '10%'
                  }
                }
              },
            }
          }

          renderCard={(pet)=>{
            if (!!pet){
              
              return(
                <View style={styles.card}>

                  <TouchableOpacity>
                    <Image style={styles.avatar} source={
                      pet['pet_media'].length > 0 
                      ? {uri: GetImageOrder(pet['pet_media'])}
                      : Place_Holder
                    } />
                  </TouchableOpacity>
                  <View style={styles.footer}>
                    <Text style={styles.name}> {pet.name} </Text>
                    <Text style={styles.bio} numberOfLines={2}> {pet.description} </Text>
                  </View>

                </View>
              )
            }
             
            }}/>

          </View>
          :  <Text style={styles.headerText}> Nenhum Pet nas proximidades </Text> }
            
        </View>}

        <View style={styles.buttonsContainer}>

          <TouchableOpacity style={[styles.button, {width:40, height:40}]} onPress={() => deck.current.swipeBack()}
            disabled = {!swipedAll}>
            <Entypo name="back" size={24} color={!swipedAll ? "#d3d3d3" :"#FF9601"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeLeft()}
            disabled = {!swipedAll} > 
            <Entypo name="cross" size={50} color={!swipedAll ? "#d3d3d3" : "#fe5167"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => deck.current.swipeRight()}
            disabled = {!swipedAll}>
            <AntDesign name="heart" size={28} color={!swipedAll ? "#d3d3d3" :"#36e8b8"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {width:40, height:40}]} onPress={() => deck.current.swipeBottom()}
            disabled = {!swipedAll} >
            <AntDesign name="star" size={24} color={!swipedAll ? "#d3d3d3" :"#65D2EB"} />
          </TouchableOpacity>

        </View>

      <View style={{alignSelf:'center', width:'100%', paddingVertical:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
      
      <View style={{flex: 0.12, flexDirection: "row", justifyContent:"space-between", paddingTop:'1%'}}>
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

      { !loading && matchPet && (

        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsamatch}/>
          <Image style={styles.matchAvatar} source={Place_Holder}/>
          <Text style={styles.matchName}>{pets[idx].name}</Text>
          <Text style={styles.matchBio}>{pets[idx].description}</Text>

          <TouchableOpacity onPress={() => setMatchPet(null)}>
            <Text style={styles.closeMatch}>FECHAR</Text>
          </TouchableOpacity>
        </View>

      )}

      { !loading && superMatchPet && (

        <View style={styles.superMatchContainer}>
          <Image style={styles.matchImage} source={itsamatch}/>
          <Image style={styles.matchAvatar} source={Place_Holder}/>
          {/* {console.log(idx)} */}
          <Text style={styles.matchName}>Você recebeu um Super-Like do </Text>
          <Text style={styles.matchName}>{pets[idx].name}</Text>
          <Text style={styles.matchBio}>{pets[idx].description}</Text>

          <TouchableOpacity onPress={() => setSuperMatchPet(null)}>
            <Text style={styles.closeMatch}>FECHAR</Text>
          </TouchableOpacity>
        </View>

      )}     

    </View>
    );
  }

  const styles = StyleSheet.create({

    container: {
      backgroundColor:'#ffffff'

    },

    logo: {
      marginTop: '10%',
      marginBottom: '1%',
      width: 70,
      height: 70,
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
      paddingHorizontal: '5%',
      paddingVertical: '4%',
    },
  
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  
    bio: {
      fontSize: 14,
      color: '#999',
      marginTop: '2%',
      lineHeight: 18,
    },
  
    buttonsContainer: {
      flexDirection: 'row',
      paddingBottom: '1%',
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: "1%",
      bottom: '-3%', 
      zIndex: -1

    },
    headerText:{
      fontFamily: 'Nunito_700Bold',
      textAlign: 'center',
      fontSize:20,
      paddingTop:'60%'
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
    },

    matchContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    superMatchContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#65D2EB',
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    matchImage: {
      height: 70,
      resizeMode:'contain',

    },

    matchAvatar: {
      width: 160,
      height: 160,
      borderRadius: 80,
      borderWidth: 5,
      borderColor: "#fff",
      marginVertical: 30
    },

    matchName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },

    matchBio: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: '1%',
      lineHeight: 24,
      textAlign: 'center',
      paddingHorizontal: 30
    },

    closeMatch: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: '5%'
    }

});