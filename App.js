import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './src';

console.ignoredYellowBox = [
    'Setting a timer'
];

registerRootComponent(App);

