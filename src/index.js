import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


import Login from './pages/Login/Login';
import AccountAmicusco from './pages/Login/AccountAmicusco';
import LoginAmicusco from './pages/Login/LoginAmicusco';
import AccountRecovery from './pages/Login/AccountRecovery';

import PetLogin from './pages/LoginPet/PetLogin';
import PetPerfil from './pages/LoginPet/PetPerfil';
import PetAdd from './pages/LoginPet/PetAdd';

import Main from './pages/Main/Main';
import Chat from './pages/Main/Chat/Chat';
import ChatMessage from './pages/Main/Chat/ChatMessage';
import Profile from './pages/Main/Profile/Profile';
import ProfileAdd from './pages/Main/Profile/ProfileAdd';
import ProfileOwner from './pages/Main/Profile/ProfileOwner';
import ProfilePass from './pages/Main/Profile/ProfilePass';


//Import Fonts
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

const LoginStack = createNativeStackNavigator();
const LoginPetStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

function StackLogin(){
  return(
    <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <LoginStack.Screen name="AccountAmicusco" component={AccountAmicusco} options={{
          title: 'Criar conta Amicusco',
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }}/>
        <LoginStack.Screen name="LoginAmicusco" component={LoginAmicusco} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }} />
        <LoginStack.Screen name="AccountRecovery" component={AccountRecovery} options={{
          title: 'Recuperação de conta', 
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }} />
        <LoginStack.Screen name="StackLoginPet" component={StackLoginPet} options={{headerShown: false}}/>
    </LoginStack.Navigator>
  );
}

function StackLoginPet(){
  return(
    <LoginPetStack.Navigator initialRouteName="PetLogin">
        <LoginPetStack.Screen name="PetLogin" component={PetLogin} options={{headerShown: false}}/>
        <LoginPetStack.Screen name="PetPerfil" component={PetPerfil} options={{headerShown: false}}/>
        <LoginPetStack.Screen name="PetAdd" component={PetAdd} options={{headerShown: false}}/>
        <LoginPetStack.Screen name="StackMain" component={StackMain} options={{headerShown: false}}/>
    </LoginPetStack.Navigator>
  );
}

function StackMain(){
  return(
    <MainStack.Navigator initialRouteName="Main">
        <MainStack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <MainStack.Screen name="Chat" component={StackChat} options={{headerShown: false}}/>
        <MainStack.Screen name="Profile" component={StackProfile} options={{headerShown: false}} />
    </MainStack.Navigator>
  );
}


function StackProfile(){
  return(
    <ProfileStack.Navigator initialRouteName="ProfileMain">
        <ProfileStack.Screen name="ProfileMain" component={Profile} options={{headerShown: false}}/>
        <ProfileStack.Screen name="ProfileAdd" component={ProfileAdd} options={{headerShown: true}}/>
        <ProfileStack.Screen name="ProfileOwner" component={ProfileOwner} options={{
          title: 'Perfil do Dono',
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }}/>
        <ProfileStack.Screen name="ProfilePass" component={ProfilePass} options={{
          title: 'Troca de Senha',
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }}/>
        <ProfileStack.Screen name="StackLogin" component={StackLogin} options={{headerShown: false}} />
    </ProfileStack.Navigator>
  );
}

function StackChat(){
  return(
    <ChatStack.Navigator initialRouteName="ChatMain">
        <ChatStack.Screen name="ChatMain" component={Chat} options={{headerShown: false}}/>
        <ChatStack.Screen name="ChatMessage" component={ChatMessage} options={{
          title: 'Troca de Senha',
          headerStyle: {
            backgroundColor: '#E8C9AE',
          },
          headerTintColor: '#111',
        }}/>
    </ChatStack.Navigator>
  );
}

function App() {
  const [logged, setLogged] = React.useState(false);

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
  })
  
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(resp => {
      if (!!resp){
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  },[]);
  return (
  (logged) ? 
  (  
  <NavigationContainer>
    <StackLoginPet/>
  </NavigationContainer>
  )
  :
  <NavigationContainer>
    <StackLogin/>
  </NavigationContainer>
  );
}

export default App;