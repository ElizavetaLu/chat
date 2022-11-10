import React from "react";
import "./chatMessage.scss"

const ChatMessage = ({ message, auth, time }) => {
    const { text, uid, name } = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`msg ${messageClass}`}>
            <div className="info">
                <div className="user-name">{name}</div>
            </div>

            <div className="msg-area">
                <div className="msg-text">  {text}</div>
                <div className="send-time">{time}</div>
            </div>
        </div>
    )
}
export default ChatMessage