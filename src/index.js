import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';


import Login from './pages/Login/Login';
import AccountAmicusco from './pages/Login/AccountAmicusco';
import LoginAmicusco from './pages/Login/LoginAmicusco';
import AccountRecovery from './pages/Login/AccountRecovery';

import PetLogin from './pages/LoginPet/PetLogin';
import PetPerfil from './pages/LoginPet/PetPerfil';

import Main from './pages/Main/Main';
import Chat from './pages/Main/Chat';
import Profile from './pages/Main/Profile';



function HomeScreen({ navigation }) {
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
const MainTab = createBottomTabNavigator();

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
        <LoginPetStack.Screen name="PetPerfil" component={PetPerfil} options={{headerShown: true}}/>
    </LoginPetStack.Navigator>
  );
}

function TabMain(){
  return(
    <MainTab.Navigator 
    tabBarPosition="bottom"
    tabBarOptions={{
      activeTintColor: '#9C27B0',
      inactiveTintColor: '#777'
    }}>
        <MainTab.Screen name="Main" component={Main} options={{headerShown: false}} />
        <MainTab.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
        <MainTab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
    </MainTab.Navigator>
  );
}

function App() {
  axios.get('https://amicusco-auth.herokuapp.com/').then((resp) => console.log(resp));
  const logged = false;

  return logged ? 
  (
    <NavigationContainer>
      <TabMain/>
    </NavigationContainer>
  )
  :
  (
    <NavigationContainer>
      <StackLogin/>
    </NavigationContainer>
  );
}

export default App;