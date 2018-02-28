// Screen Shot 2018-02-14 at 12.10.32 PM.png
import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyAh9hfIe4IjrVyL_PB1JailwTNNhnCt4tE",
    authDomain: "photo-upload-79725.firebaseapp.com",
    databaseURL: "https://photo-upload-79725.firebaseio.com",
    projectId: "photo-upload-79725",
    storageBucket: "photo-upload-79725.appspot.com",
    messagingSenderId: "433123060595"
  };
  

  var Fire = firebase.initializeApp(config);

  export default Fire;