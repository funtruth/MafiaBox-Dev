import React, { useState } from 'react';
import firebase from 'firebase'

export default function AuthLogin(props) {
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")

    let [error, setError] = useState({})

    let handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(id, pw)
        .catch(error => {
            switch(error.code) {
            case 'auth/invalid-email':
                setError({id: "*Invalid email address"})
                break
            case 'auth/user-disabled':
                setError({pw: "*Account disabled"})
                break
            case 'auth/user-not-found':
                setError({id: "*User not found"})
                break
            case 'auth/wrong-password':
                setError({pw: "*This password is invalid"})
                break
            default:
            }
        })
    }

    let handleId = e => setId(e.target.value)
    let handlePw = e => setPw(e.target.value)

    return (
        <>
            <div className="auth-mixed-title">
                <div className="auth-title">Email</div>
                <div className="auth-error">{error.id}</div>
            </div>
            <input
                className="auth-input"
                value={id} 
                type="text"
                onChange={handleId}
            />
            <div className="auth-mixed-title">
                <div className="auth-title">Password</div>
                <div className="auth-error">{error.pw}</div>
            </div>
            <input
                className="auth-input"
                value={pw}
                type="password"
                onChange={handlePw}
            />
            <div
                className="auth-button"
                onClick={handleLogin}
            >
                Login
            </div>
        </>
    );
}