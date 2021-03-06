import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/logo.png';
import Place_Holder from '../../../assets/Place_Holder.png';
import {Ionicons} from "@expo/vector-icons";
import { GetImageOrder } from '../../../Components/GetImages';

//import fonts
import { useFonts } from 'expo-font';
import { 
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'

export default function Chat({ navigation }) {
  
  const [matchs, setMatchs] = React.useState([]);
  const [myPet, setMyPet] = React.useState(null);

  //Import Fonts
  let [fontsLoaded]=useFonts({
      Nunito_300Light,
      Nunito_400Regular,
      Nunito_600SemiBold,
      Nunito_700Bold,
  })
    
  React.useEffect(() => {
    const getLikes = async() => {
      let likesData = JSON.parse(await AsyncStorage.getItem('likes'));
      var petsData = JSON.parse(await AsyncStorage.getItem('pets'));
      var likeList = likesData.filter(el => el.match);
      var likesId = likeList.map(el => {
        if(el.match){
          return el.petId
        }
      });
      petsData = petsData.filter(el => likesId.includes(el.id));
      petsData = petsData.map(element => {
        var indexLike = likesId.indexOf(element.id);
        return {...element, "chatId": likeList[indexLike]['chatId']}
      });
      
      //console.log(petsData);  
      
        
      setMatchs(petsData);
      setMyPet(JSON.parse(await AsyncStorage.getItem('pet')));
    }
    getLikes();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(10).then(() => setRefreshing(false));
  }, []);

    const screenHeight = Dimensions.get('window').height + StatusBar.currentHeight;
    return (

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
      <View style={[{height:screenHeight},styles.container]}>
         <View>
            <Text style={styles.headerText}>Chat</Text>
         </View>
         
        <View style={{flex: 0.9}}>
          <ScrollView>
              {matchs.map(el => {
                var image = GetImageOrder(el['pet_media']);
                
                return(
                <View style={{alignItems: "flex-start", justifyContent:"flex-start", paddingTop: '5%', padding: '1%'}}>
                  <TouchableOpacity 
                    style={{borderRadius:50, flexDirection:"row", alignItems: "center", justifyContent:"flex-start", width:"100%", height:50, paddingLeft:"1%"}}
                    onPress={() => navigation.navigate('ChatMessage', { likeId: el.chatId, petId: myPet.id })}>   
                    <Image source={ image === null ? Place_Holder : { uri: image }} style={{width: 60, height: 60, borderRadius: 180, paddingLeft:"5%"}} />
                    <Text style={{paddingLeft:"10%", fontFamily: 'Nunito_600SemiBold', fontSize: 25}}>{el.name}</Text> 
                  </TouchableOpacity>

                  <View style={{alignSelf:'center', width:'100%', paddingTop:'5%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
              </View>
              )}
              )}
              
          </ScrollView>  
        </View>
        

        <View style={{alignSelf:'center', width:'100%', paddingHorizontal:'2%' ,borderBottomColor: '#999999', borderBottomWidth: 1}}/>  
        
        <View style={{flex: 0.1, flexDirection: "row", justifyContent:"space-between", padding:'3%'}}>
        <TouchableOpacity 
              style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Main')}>   
              <Image source={logo} style={ {width: 30, height: 30}} />
          </TouchableOpacity>  

          <TouchableOpacity 
              style={{borderRadius:50, backgroundColor:'#F2F2F2', alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Chat')}
              disabled>   
              <Ionicons name="chatbubbles-sharp" size={30} color='#E8C9AE'/>
          </TouchableOpacity>

          <TouchableOpacity 
              style={{borderRadius:50, alignItems: "center",justifyContent:"center", width:40, height:40}}
              onPress={() => navigation.navigate('Profile')}>   
              <Ionicons name="person-circle-outline" size={35} color='#E8C9AE'/>
          </TouchableOpacity>
         
        </View>
      </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({

    container: {
      backgroundColor:'#ffffff'

    },
    headerText:{
      fontFamily: 'Nunito_700Bold',
      fontSize:30,
      paddingLeft: '5%',
      paddingTop:'10%'
  },
  scrollView: {
    flex: 1,
  },

});