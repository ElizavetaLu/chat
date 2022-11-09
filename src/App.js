import React, { useState } from 'react';
import "./App.scss"
import Auth from './components/auth/Auth';
import Chat from './components/chat/Chat';
// import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { initializeFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBQaaoaKHqQus7e9XTlnpn491tAAAeXEXc",
//   authDomain: "online-chat-11a30.firebaseapp.com",
//   projectId: "online-chat-11a30",
//   storageBucket: "online-chat-11a30.appspot.com",
//   messagingSenderId: "523218586655",
//   appId: "1:523218586655:web:8178097c65eb84c0a6d92a",
//   measurementId: "G-MYHZ86M25N"
// };

// const app = initializeApp(firebaseConfig);

const test = firebase.initializeApp({
  apiKey: "AIzaSyBQaaoaKHqQus7e9XTlnpn491tAAAeXEXc",
  authDomain: "online-chat-11a30.firebaseapp.com",
  projectId: "online-chat-11a30",
  storageBucket: "online-chat-11a30.appspot.com",
  messagingSenderId: "523218586655",
  appId: "1:523218586655:web:8178097c65eb84c0a6d92a",
  measurementId: "G-MYHZ86M25N"
})



// const auth = firebase.auth();
const firestore = firebase.firestore();

// console.log(app)
// const analytics = getAnalytics(app);

const auth = getAuth();

initializeFirestore(test, {
  experimentalForceLongPolling: true,
})



function App() {

  // console.log(useCollectionData())
  signInAnonymously(auth)
    .then(() => {
      // console.log('it works')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  const [user] = useAuthState(auth);




  // console.log(user)


  const [isAuth, setIsAuth] = useState(false)
  const [userName, setUserName] = useState('')

  return (
    <div className="main">
      {isAuth
        ? <Chat userName={userName} auth={auth} firestore={firestore} />
        : <Auth setIsAuth={setIsAuth} setUserName={setUserName} />}

    </div>
  );
}

export default App;
