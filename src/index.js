import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';


import Login from './pages/Login/Login';
import AccountAmicusco from './pages/Login/AccountAmicusco';
import LoginAmicusco from './pages/Login/LoginAmicusco';
import AccountRecovery from './pages/Login/AccountRecovery';

import PetLogin from './pages/LoginPet/PetLogin';
import PetPerfil from './pages/LoginPet/PetPerfil';
import PetAdd from './pages/LoginPet/PetAdd';

import Main from './pages/Main/Main';
import Chat from './pages/Main/Chat';
import Profile from './pages/Main/Profile/Profile';
import ProfileAdd from './pages/Main/Profile/ProfileAdd';
import ProfileOwner from './pages/Main/Profile/ProfileOwner';


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


function HomeScreen({ navigation }) {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
      title="Details"
      onPress={()=>navigation.navigate('Login')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const LoginStack = createNativeStackNavigator();
const LoginPetStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function StackLogin(){
  return(
    <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <LoginStack.Screen name="AccountAmicusco" component={AccountAmicusco}/>
        <LoginStack.Screen name="LoginAmicusco" component={LoginAmicusco} />
        <LoginStack.Screen name="AccountRecovery" component={AccountRecovery} />
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
        <MainStack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
        <MainStack.Screen name="Profile" component={StackProfile} options={{headerShown: false}} />
    </MainStack.Navigator>
  );
}


function StackProfile(){
  return(
    <ProfileStack.Navigator initialRouteName="ProfileMain">
        <ProfileStack.Screen name="ProfileMain" component={Profile} options={{headerShown: false}}/>
        <ProfileStack.Screen name="ProfileAdd" component={ProfileAdd} options={{headerShown: true}}/>
        <ProfileStack.Screen name="ProfileOwner" component={ProfileOwner} options={{headerShown: true}}/>
        <ProfileStack.Screen name="StackLogin" component={StackLogin} options={{headerShown: false}} />
    </ProfileStack.Navigator>
  );
}

//vamos tirar o tabmain e transformar em botões (tem que fazer um arquivo novo ja que vai ser chamado por paginas diferentes)
function App() {
  const [logged, setLogged] = React.useState(false);
  
  React.useEffect(() => {
    AsyncStorage.getItem('user').then(resp => {
      console.log(!!resp);
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
    <StackMain/>
  </NavigationContainer>
  )
  :
  <NavigationContainer>
    <StackMain/>
  </NavigationContainer>
  );
}

export default App;