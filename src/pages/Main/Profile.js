import * as React from 'react';
import { View, Text, Button } from 'react-native';





export default function Profile({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
        <Button 
        title="Details"
        />
      </View>
    );
  }

