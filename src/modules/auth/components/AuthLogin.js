import React, { useState } from 'react';
import firebase from '../../firebase/firebase'

export default function AuthLogin(props) {
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")

    let [idError, setIdError] = useState("")
    let [pwError, setPwError] = useState("")

    let handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(id, pw)
        .catch(error => {
            switch(error.code) {
            case 'auth/invalid-email':
                setIdError("Invalid email address")
                setPwError("")
                break
            case 'auth/user-disabled':
                setIdError(error.message)
                setPwError("")
                break
            case 'auth/user-not-found':
                setIdError(error.message)
                setPwError("")
                break
            case 'auth/wrong-password':
                setIdError("")
                setPwError("This password is invalid")
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
            <div className="auth-error">{idError}</div>
          </div>
          <input
            className="auth-input"
            value={id} 
            type="text"
            onChange={handleId}
          />
          <div className="auth-mixed-title">
            <div className="auth-title">Password</div>
            <div className="auth-error">{pwError}</div>
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