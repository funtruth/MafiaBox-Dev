import React, { useState } from 'react';
import firebase from '../../firebase/firebase'

export default function AuthRegister(props) {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")

    let [id, setId] = useState("")
    let [pw, setPw] = useState("")

    let [errors, setError] = useState({})

    let handleLogin = () => {
        if (!firstName || !lastName || !id || !pw) {
            setError({
                firstName: firstName ? "": "*Field is required",
                lastName: lastName ? "" : "*Field is required",
                id: id ? "" : "*Field is required",
                pw: pw ? "" : "*Field is required",
            })
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(id, pw)
        .then(({user}) => {
            const { email, photoURL, uid } = user
            firebase.database().ref(`users/${user.uid}`).set({
                firstName: firstName,
                lastName: lastName,
                email: email || "",
                photoUrl: photoURL || "",
                uid: uid || "",
            })
        })
        .catch(error => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    setError({id: "*Account with email already exists"})
                    break
                case 'auth/invalid-email':
                    setError({id: "*Enter a valid email"})
                    break
                case 'auth/weak-password':
                    setError({pw: "*This password is too weak"})
                    break
                default:
            }
        })
    }

    let handleFirstName = e => setFirstName(e.target.value)
    let handleLastName = e => setLastName(e.target.value)
    let handleId = e => setId(e.target.value)
    let handlePw = e => setPw(e.target.value)

    return (
        <>
            <div className="row">
                <div>
                    <div className="auth-mixed-title">
                        <div className="auth-title">First Name</div>
                        <div className="auth-error">{errors.firstName}</div>
                    </div>
                    <input
                        className="auth-input autocap"
                        value={firstName} 
                        type="text"
                        autoCapitalize="words"
                        onChange={handleFirstName}
                    />
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <div className="auth-mixed-title">
                        <div className="auth-title">Last Name</div>
                        <div className="auth-error">{errors.lastName}</div>
                    </div>
                    <input
                        className="auth-input autocap"
                        value={lastName}
                        type="text"
                        autoCapitalize="words"
                        onChange={handleLastName}
                    />
                </div>
            </div>
            <div className="auth-mixed-title">
                <div className="auth-title">Email</div>
                <div className="auth-error">{errors.id}</div>
            </div>
            <input
                className="auth-input"
                value={id} 
                type="email"
                onChange={handleId}
            />
            <div className="auth-mixed-title">
                <div className="auth-title">Password</div>
                <div className="auth-error">{errors.pw}</div>
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
                Complete Registration
            </div>
        </>
    );
}