// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import { chatSend, getMessages } from '../../../../firebase';



export default function ChatMessage(){

  const [messages, setMessages] = React.useState([]);

  React.useEffect(()=>{
   // console.log("CHATMESSAGE");
    getMessages(messages, setMessages);
  }, []);

  const onSend = React.useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    chatSend(newMessages[0])
  }, [])

    return (
      <GiftedChat
        messages={messages}
        //onSend={message => {chatSend(GiftedChat.append(messages, message))}}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1
        }}
      />
    );
  } 




