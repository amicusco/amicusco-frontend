import 'react-native-get-random-values';
import {v4} from 'uuid';
var firebase = require('firebase/app');
import 'firebase/storage';
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

export { uploadImage };