import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';


import Login from './pages/Login/Login';
import AccountAmicusco from './pages/Login/AccountAmicusco';
import LoginAmicusco from './pages/Login/LoginAmicusco';
import AccountRecovery from './pages/Login/AccountRecovery';

import PetLogin from './pages/Main/PetLogin'
import PetPerfil from './pages/Main/PetPerfil';

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
const MainStack = createNativeStackNavigator();

function StackLogin(){
  return(
    <LoginStack.Navigator initialRouteName="PetPerfil">
        <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <LoginStack.Screen name="AccountAmicusco" component={AccountAmicusco}/>
        <LoginStack.Screen name="LoginAmicusco" component={LoginAmicusco} />
        <LoginStack.Screen name="AccountRecovery" component={AccountRecovery} />
        <LoginStack.Screen name="StackMain" component={StackMain} options={{ headerShown: false }}/>
        <LoginStack.Screen name="PetPerfil" component={PetPerfil} options={{headerShown: false}}/>
    </LoginStack.Navigator>
  );
}

function StackMain(){
  return(
    <MainStack.Navigator initialRouteName="PetLogin">
        <MainStack.Screen name="PetLogin" component={PetLogin} options={{headerShown: false}}/>
    </MainStack.Navigator>
  );
}

function App() {
  axios.get('https://amicusco-auth.herokuapp.com/').then((resp) => console.log(resp));
  return (
    <NavigationContainer>
      <StackLogin/>
    </NavigationContainer>
  );
}

export default App;