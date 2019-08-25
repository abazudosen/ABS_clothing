import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAn6wuQGeyzacPbxSMXmPxOYuJzuNUGKYE",
  authDomain: "crown-clothingdb-3e15b.firebaseapp.com",
  databaseURL: "https://crown-clothingdb-3e15b.firebaseio.com",
  projectId: "crown-clothingdb-3e15b",
  storageBucket: "",
  messagingSenderId: "1070425902281",
  appId: "1:1070425902281:web:461149d7d8342e5d"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;