require("dotenv").config();
//const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
//const admin = require('firebase-admin');
//const functions = require('firebase-functions');
/*initializeApp({
  credential: applicationDefault(),
});*/

/*const firebaseConfig = {
  apiKey: "AIzaSyAIgHRdKzKEajo2T9uICvkdIHToQxgDfHg",
  authDomain: "vaper-studio-mx.firebaseapp.com",
  databaseURL: "https://vaper-studio-mx-default-rtdb.firebaseio.com",
  projectId: "vaper-studio-mx",
  storageBucket: "vaper-studio-mx.appspot.com",
  messagingSenderId: "337929808349",
  appId: "1:337929808349:web:431a05e4f789c241e56e34",
  measurementId: "G-MSNXPEC6NF"
};
//var serviceAccount = require(process.env.FIREBASE);

// Initialize Firebase
initializeApp(firebaseConfig);*/

//var serviceAccount = require(process.env.FIREBASE+'vaper-studio-mx-553ef5a1e9f7.json');
//inicializador
//admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
 // databaseURL: 'https://vaper-studio-mx-default-rtdb.firebaseio.com'
//});



var admin = require("firebase-admin");

var serviceAccount = require("./vaper-studio-mx-553ef5a1e9f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const db = getFirestore();


module.exports = {
  db,
};