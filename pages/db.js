import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRNEKsTcPeH4-asmYvWA7zZqdJpgZOMy8",
    authDomain: "tani-pintar.firebaseapp.com",
    databaseURL: "https://tani-pintar.firebaseio.com",
    projectId: "tani-pintar",
    storageBucket: "tani-pintar.appspot.com",
    messagingSenderId: "387250362586",
    appId: "1:387250362586:web:c8182b2c9e7bc1ff0aade3",
    measurementId: "G-2VLJ6ZX8ZK"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;