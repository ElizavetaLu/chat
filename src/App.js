import React, { useEffect, useState } from 'react';
import "./App.scss"
import Auth from './components/auth/Auth';
import Chat from './components/chat/Chat';
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import { initializeFirestore } from 'firebase/firestore';

const test = firebase.initializeApp({
  apiKey: "AIzaSyBQaaoaKHqQus7e9XTlnpn491tAAAeXEXc",
  authDomain: "online-chat-11a30.firebaseapp.com",
  projectId: "online-chat-11a30",
  storageBucket: "online-chat-11a30.appspot.com",
  messagingSenderId: "523218586655",
  appId: "1:523218586655:web:8178097c65eb84c0a6d92a",
  measurementId: "G-MYHZ86M25N"
})


const firestore = firebase.firestore();
const auth = getAuth();

initializeFirestore(test, {
  experimentalForceLongPolling: true,
})

const statusLocalStorage = JSON.parse(localStorage.getItem('isAuth') || 'false')

function App() {

  signInAnonymously(auth)
    .then(() => { })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const [user] = useAuthState(auth);

  const [isAuth, setIsAuth] = useState(statusLocalStorage)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth))
  }, [isAuth])

  return (
    <div className="main">
      {isAuth
        ? <Chat userName={userName} auth={auth} firestore={firestore} />
        : <Auth setIsAuth={setIsAuth} setUserName={setUserName} />}

    </div>
  );
}

export default App;
