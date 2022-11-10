import React, { useState } from "react";
import "./auth.scss"


const Auth = ({ setIsAuth, setUserName }) => {

    const [name, setName] = useState('')

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-text">Sign in Pipka-chat</div>
                <div className="auth">
                    <div className="form__group field">
                        <input
                            type="input"
                            className="form__field"
                            placeholder="Name"
                            name="name"
                            id='name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="form__label">Name</label>
                    </div>
                    <button
                        className="auth-btn"
                        disabled={name.length === 0 ? true : false}
                        onClick={() => {
                            setIsAuth(true)
                            setUserName(name)
                        }}
                    >Sign in</button>
                </div>
            </div>
        </div>
    )
}
export default Auth