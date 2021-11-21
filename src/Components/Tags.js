import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export function Tag({ tag, setSelectedInterests, selectedInterests, petTags=[] }) {

  var [ isPress, setIsPress ] = React.useState(false);

  React.useEffect (()=>{
  petTags.forEach(el => { 
    if (el['id']==tag['id'])
    setIsPress(true)
    });
  },[])

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => setIsPress(!isPress)                 // <-- "onPress" is apparently required
  };
  
  React.useEffect (()=>{ 
    isPress ? setSelectedInterests([...selectedInterests, tag['id']]) : setSelectedInterests(el => el.filter((aux)=>{return aux !== tag['id'] }));
  },[isPress])

  return (
      <TouchableOpacity {...touchProps}>
        <Text style={styles.text}>{tag['tag']}</Text> 
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
    marginLeft: '2%',
    padding: 5,
},
  btnPress: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: '#F6E9DF',
    marginTop: '2%',
    marginLeft: '2%',
    padding: 5
  }
});