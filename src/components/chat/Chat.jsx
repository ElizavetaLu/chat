import React, { useEffect, useRef, useState } from "react";
import "./chat.scss"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../chatMsg/ChatMessage'
import { updateDoc, serverTimestamp } from "firebase/firestore";


function useChatScroll(dep){
    const ref = React.useRef();
    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);
    return ref;
}

const Chat = ({ userName, auth, firestore }) => {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    // const bottomRef = useRef(null);


    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = useState('');


    const ref = useChatScroll(messages)

    const sendMessage = async (e) => {
        e.preventDefault();

        //         const docRef = doc(db, 'objects', 'some-id');

        //         const updateTimestamp = await updateDoc(docRef, {
        //             timestamp: serverTimestamp()
        //         });

        // console.log(updateTimestamp)

        const { uid } = auth.currentUser;
        // console.log(formValue, userName, uid)
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            name: userName,
            uid,
        })

        setFormValue('');
    }









    // useEffect(() => {
    //     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    // console.log(messages)

    // const data = new Date(createdAt.seconds).toString()
    //     const time = createdAt
    //         ? data.slice(16, 21) + data.slice(16, 21)
    //         : null

    // console.log(messages)
    // const getMsgTime = (seconds) => {
    //     if (seconds) return '--:--'
    //     return new Date(seconds).toString().slice(16, 21) + new Date(seconds).toString().slice(23, 25)
    // }
    // console.log(new Date(messages[20].createdAt.seconds).toString())
    return (
        <div className="container">
            <div className="header">
                Pipka-chat
                <img src="/chat/build//cats/0e0a7c30f0648804717c6f463fbd676e.png" alt="" width="25px" />
            </div>
            <div className="blur" >
                <div className="area" ref={ref}>


                    {messages && messages.map((msg, indx) => <ChatMessage
                        key={indx}
                        message={msg}
                        auth={auth}
                        time={"00:00"}
                    // time={getMsgTime(msg.createdAt?.seconds)}
                    />)
                    }

                    {/* <span ref={ref}></span> */}
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
                >
                    {/* <img src="/icons8-email-send-48.png" alt="" width="25px" /> */}
                    <img src="/chat/build//icons8-email-send-48.png" alt="" width="25px" />
                </button>
            </form>

        </div>
    )
}
export default Chat