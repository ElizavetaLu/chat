import React, { useRef, useState } from "react";
import "./chat.scss"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../chatMsg/ChatMessage'

const Chat = ({ userName, auth, firestore }) => {

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    // console.log(messagesRef)

    const [messages] = useCollectionData(query);
    // console.log(messages)
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;
        // console.log(firebase)
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }





    return (
        <div className="container">
            {/* <div className="area" style={{backgroundImage: 'url("/green-gf3eb37345_1920.jpg")'}}> */}
            <div className="area" >
                {messages && messages.map(msg => <ChatMessage userName={userName} key={msg.text} message={msg} auth={auth} />)}
                {/* <span ref={dummy}></span>s */}


            </div>
            <form onSubmit={sendMessage} className="message-form">

                <textarea
                    className="message-textarea"
                    value={formValue}
                    onChange={e => setFormValue(e.target.value)}></textarea>
                {/* <input
                    className="message-input"
                    value={formValue}
                    onChange={e => setFormValue(e.target.value)} /> */}

                <button className="message-btn" type="submit" disabled={!formValue}>
                    <img src="chat/icons8-cat-footprint-50.png" alt="" width="30px"/>
                </button>
            </form>
        </div>
    )
}
export default Chat