import Firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCSDHRSgyB-Hlkiyo7ERhjDjIeVgCQqjE0",
  authDomain: "native-dead.firebaseapp.com",
  databaseURL: "https://native-dead.firebaseio.com",
  projectId: "native-dead",
  storageBucket: "native-dead.appspot.com",
  messagingSenderId: "508250335024",
  appId: "1:508250335024:web:e787871f1ae8e8ae214af5",
  measurementId: "G-99N7JKW2NV",
};

// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();
