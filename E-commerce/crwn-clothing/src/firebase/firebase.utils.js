import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";



const config = {
    apiKey: "AIzaSyDiYwN0IE43gpLrfKZM9XSf0t8cuio-caM",
    authDomain: "crwndb-2ae5c.firebaseapp.com",
    databaseURL: "https://crwndb-2ae5c.firebaseio.com",
    projectId: "crwndb-2ae5c",
    storageBucket: "crwndb-2ae5c.appspot.com",
    messagingSenderId: "888945178629",
    appId: "1:888945178629:web:b8fe8dd134bfe5c84ac46c",
    measurementId: "G-KQ7XS7EZGN"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
      console.log(userAuth + "HAHA-0");
      return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
          console.log("Error creating user: " + error.message);
      }
    }
    
    return userRef;

  };


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" })
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;