import 'react-native-get-random-values';
import {v4} from 'uuid';
var firebase = require('firebase/app');
import 'firebase/storage';
import 'firebase/firestore';
import App from './src';

const firebaseConfig = {
  apiKey: 'AIzaSyAAu56wNnQuSBmGHe-kvVmoBGkf59vt3HE',
  authDomain: 'amicusco-a26ea.firebaseapp.com',
  databaseURL: 'https://amicusco-a26ea-default-rtdb.firebaseio.com/',
  projectId: 'amicusco-a26ea',
  storageBucket: 'amicusco-a26ea.appspot.com',
  messagingSenderId: '282693738174'
}
// Initialize Firebase
// if (!getApps().default.lenght){
    firebase.default.initializeApp(firebaseConfig);
// }

async function uploadImage(singleFile) {
    const uploadedFile = {};

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", singleFile.uri, true);
        xhr.send(null);
    });
    const idFile = v4();
    uploadedFile['name'] = idFile;
    const storage = firebase.default.storage();
    const fileRef = storage.ref();
    const fileChild =  fileRef.child(idFile);
    await fileChild.put(blob);

    blob.close();

    const url = await fileChild.getDownloadURL();
    uploadedFile['url'] = url;
    return uploadedFile;
};

async function chatSend(message){
  const { _id, text, user, createdAt } = message;
  //console.log("CHATSEND:", message);

  const db = firebase.default.firestore();
  await db.collection("chats").add({
    _id, createdAt, text, user
  })
}

async function getMessages(messages, setMessages){
  const db = firebase.default.firestore();
  await db.collection("chats").orderBy("createdAt", 'desc').get()
  .then(resp => {
    var newMessages = [];
    resp.forEach(doc => {
      newMessages.push({
        "_id": doc.data()._id,
        "text": doc.data().text,
        "user": doc.data().user,
        "createdAt": doc.data().createdAt.toDate(),
      });
    });
    // .map(el => {
    //   return {"id": el._id, "text": el.text, "createdAt": el.createdAt, "user": el.user}
    // })
    setMessages([...messages, ...newMessages]);
  });
}

export { chatSend, getMessages, uploadImage };