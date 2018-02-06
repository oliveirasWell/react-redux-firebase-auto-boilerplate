import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDcwu_FqqT64JhZ3O6PR5KcqCjaYL1V18E",
    authDomain: "esp8266-teste.firebaseapp.com",
    databaseURL: "https://esp8266-teste.firebaseio.com",
    projectId: "esp8266-teste",
    storageBucket: "esp8266-teste.appspot.com",
    messagingSenderId: "846578518307"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// TODO will be uncommented when auth developed
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();