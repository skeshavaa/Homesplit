import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyC2ALSv_BSrkcuH3jDqqW8TIdH-oZpwvkQ",
    authDomain: "homesplit-abb79.firebaseapp.com",
    databaseURL: "https://homesplit-abb79.firebaseio.com",
    projectId: "homesplit-abb79",
    storageBucket: "",
    messagingSenderId: "390876131201",
    appId: "1:390876131201:web:49e53f2d71edb455"
  };

  // Initialize Firebase
  const fireapp = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings( {timestampsInSnapshots: true });

  const db = fireapp.firestore();

  export { db };

  export default firebase;