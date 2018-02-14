import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAJw3Ob1LTJpJyFBQ84e8m71e-nhXrs6L8",
    authDomain: "bep-homolog.firebaseapp.com",
    databaseURL: "https://bep-homolog.firebaseio.com",
    projectId: "bep-homolog",
    storageBucket: "bep-homolog.appspot.com",
    messagingSenderId: "277693523048"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// TODO will be uncommented when auth developed
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider();