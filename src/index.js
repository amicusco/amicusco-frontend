import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';


import Login from './pages/Login';
import AccountAmicusco from './pages/AccountAmicusco';
import LoginAmicusco from './pages/LoginAmicusco';
import AccountRecovery from './pages/AccountRecovery';

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

const Stack = createNativeStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="AccountAmicusco" component={AccountAmicusco}  />
        <Stack.Screen name="LoginAmicusco" component={LoginAmicusco} />
        <Stack.Screen name="AccountRecovery" component={AccountRecovery} />
    </Stack.Navigator>
  );
}

function App() {
  axios.get('https://amicusco-auth.herokuapp.com/').then((resp) => console.log(resp));
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;