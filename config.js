import firebase from 'firebase';
import { exp } from 'react-native-reanimated';
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyB-FdgQlsNLGYpT52_CJpT7GVMgP4ueVic",
    authDomain: "storyhub-01000111.firebaseapp.com",
    projectId: "storyhub-01000111",
    storageBucket: "storyhub-01000111.appspot.com",
    messagingSenderId: "223748007157",
    appId: "1:223748007157:web:4bd7ad962df71ce7a591bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();