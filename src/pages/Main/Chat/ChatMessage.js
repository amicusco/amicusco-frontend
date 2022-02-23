// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { RefreshControl } from 'react-native';

import { chatSend, getMessages } from '../../../../firebase';
import { GetImageOrder } from '../../../Components/GetImages';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ChatMessage({ route }){
  const likeId = route.params.likeId;
  const petId = route.params.petId;
  const [myImage, setMyImage] = React.useState([]);
  React.useEffect(() => {
    async function getMyImagePet(){
      const media = JSON.parse(await AsyncStorage.getItem('pet'))['pet_media'];
      setMyImage(GetImageOrder(media));
    }
    getMyImagePet();
  }, [])
  const [messages, setMessages] = React.useState([]);

  React.useEffect(()=>{
    getMessages(messages, setMessages, likeId);
  }, []);

  const onSend = React.useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    chatSend(newMessages[0], likeId);
  }, [])

 

  return (
      <GiftedChat
        messages={messages}
        //onSend={message => {chatSend(GiftedChat.append(messages, message))}}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: petId,
          avatar: myImage,
        }}
        
      />
    );
  } 




