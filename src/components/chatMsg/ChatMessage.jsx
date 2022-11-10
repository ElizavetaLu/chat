import React from "react";
import "./chatMessage.scss"

const ChatMessage = ({ isLight, message, auth, time }) => {
    const { text, uid, name } = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const theme = isLight ? 'light-msg' : 'dark-msg';

    return (
        <div className={`msg ${messageClass} ${theme}`}>

            <div className="user-name">{name}</div>

            <div className="msg-area">
                <div className="msg-text">{text}</div>
                <div className="send-time">{time.slice(16, 21)}</div>
            </div>
        </div>
    )
}
export default ChatMessage