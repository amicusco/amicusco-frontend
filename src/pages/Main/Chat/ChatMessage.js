// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import { chatSend, getMessages } from '../../../../firebase';



export default function ChatMessage({ route }){
  const likeId = route.params.likeId;
  const petId = route.params.petId;
  const myImage = route.params.myImage;
  const [messages, setMessages] = React.useState([]);

  React.useEffect(()=>{
   // console.log("CHATMESSAGE");
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




