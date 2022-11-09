import React, { useEffect, useRef, useState } from "react";
import "./chat.scss"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../chatMsg/ChatMessage'

const Chat = ({ userName, auth, firestore }) => {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const bottomRef = useRef(null);


    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid } = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            name: userName,
            uid,
        })

        setFormValue('');
    }


    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    const sentSound = new Audio("/Text Message Sent.mp3")
    const playSound = () => sentSound.play()


    return (
        <div className="container">
            <div className="header">
                Pipka-chat
                <img src="/chat/build//cats/0e0a7c30f0648804717c6f463fbd676e.png" alt="" width="25px" />
            </div>
            <div className="blur" >
                <div className="area" >
                    {messages && messages.map((msg, indx) => <ChatMessage key={indx} message={msg} auth={auth} />)}

                    <span ref={bottomRef}></span>
                </div>

            </div>

            <form onSubmit={sendMessage} className="message-form">

                <textarea
                    rows="1"
                    placeholder="Write a message..."
                    className="message-textarea"
                    value={formValue}
                    onChange={e => setFormValue(e.target.value)}
                ></textarea>

                <button
                    className="message-btn"
                    type="submit"
                    disabled={!formValue}
                    onClick={playSound}
                >
                    <img src="/chat/build//icons8-email-send-48.png" alt="" width="25px" />
                </button>
            </form>

        </div>
    )
}
export default Chat