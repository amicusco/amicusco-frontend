import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export function Tag({ tagText, setInterests=null }) {

  //console.log(tagText);
  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {setIsPress(!isPress);
    setInterests();},                 // <-- "onPress" is apparently required
  };

  return (
      <TouchableOpacity {...touchProps}>
        <Text style={styles.text}>{tagText}</Text> 
      </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: '#FFFF',
    marginTop: '2%',
    padding: '5px',
},
  btnPress: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: '#F6E9DF',
    marginTop: '2%',
    marginLeft: '2%',
    padding: '5px'
  }
});