import React, { useEffect, useRef, useState } from "react";
import "./chat.scss"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../chatMsg/ChatMessage'



const themeLocalStorage = JSON.parse(localStorage.getItem('isLight') || 'false')

function useChatScroll(dep) {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [dep]);
    return ref;
}

const Chat = ({ userName, auth, firestore }) => {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');


    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = useState('');
    const [isLight, setIsLight] = useState(themeLocalStorage)


    useEffect(() => {
        const onKeyDown = e => {
            if (e.keyCode === 13) {
                sendMessage();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);


    useEffect(() => {
        localStorage.setItem('isLight', JSON.stringify(isLight))
    }, [isLight])


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

    const ref = useChatScroll(messages)

    return (
        <div className={isLight ? "light" : "dark"}>
            <div className="header">

                <div></div>
                <div className="chat-name">Pipka-chat</div>
                <div className="theme" >
                    <div
                        className={isLight ? "circle move-right" : "circle move-left"}
                        onClick={() => setIsLight(!isLight)}
                    ></div>
                </div>
            </div>
            <div className="area-container" >
                <div className="area" ref={ref}>


                    {messages && messages.map((msg, indx) => <ChatMessage
                        isLight={isLight}
                        key={indx}
                        message={msg}
                        auth={auth}
                        time={msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toString() : '--:--'}
                    />)
                    }


                </div>

            </div>

            <form onSubmit={sendMessage} className="message-form">

                <div className="buttonIn">
                    <input
                        type="text"
                        placeholder="Write a message..."
                        className="msg-input"
                        value={formValue}
                        onChange={e => setFormValue(e.target.value)}
                    />

                    <button
                        className="msg-btn"
                        type="submit"
                        disabled={!formValue}
                    >

                        {isLight
                            ? <img src="/chat/build//icons/lightT.png" alt="" style={{ width: "25px" }} />
                            : <img src="/chat/build//icons/darkT.png" alt="" />
                        }

                    </button>
                </div>
            </form>

        </div >
    )
}
export default Chat