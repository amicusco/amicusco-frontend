import * as React from 'react';
import { View, Text, Button } from 'react-native';





export default function Main({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main</Text>
        <Button 
        title="Details"
        />
      </View>
    );
  }

