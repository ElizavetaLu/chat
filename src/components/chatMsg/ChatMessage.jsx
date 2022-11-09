import React from "react";
import "./chatMessage.scss"

const ChatMessage = ({ message, userName, auth }) => {
    const { text, uid } = message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`msg ${messageClass}`}>
            <div className="info">
                <div className="user-name">{userName}</div>
                <div className="send-time">00:00:00</div>
            </div>

            <div className="msg-text">{text}</div>
        </div>
    )
}
export default ChatMessage