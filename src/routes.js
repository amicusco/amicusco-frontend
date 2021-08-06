import { createSwitchNavigator } from '@react-navigation/native';
import { Switch } from 'react-native';

import Login from './pages/Login';
import Main from './pages/Main';

export default function Routes(){
    return(
        <Switch.Navigator>
            <Switch.Screen name="Login" component={Login}/>
            <Switch.Screen name="Main" component={Main}/>
        </Switch.Navigator>
    );
}
