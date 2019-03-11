import React, { useState, useEffect } from 'react';
import './Auth.css';
import firebase from '../firebase/firebase'

import { AUTH_SCREEN } from './AuthConstants'

import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';

export default function AuthWrapper(props) {
  let [authState, setAuthState] = useState("")
  let [authScreen, setAuthScreen] = useState(AUTH_SCREEN.LOGIN)

  const AT_LOGIN = authScreen === AUTH_SCREEN.LOGIN

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('user exists')
        } else {
          console.log('user no exists')
        }
    })
  }, [])

  let handleScreen = () => {
    if (AT_LOGIN) {
      setAuthScreen(AUTH_SCREEN.REGISTER)
    } else {
      setAuthScreen(AUTH_SCREEN.LOGIN)
    }
  }

  if (authState === "") {
    return (
      <div className="auth-wrapper">
        <div className="auth-view">
          {AT_LOGIN ? <AuthLogin/> : <AuthRegister/>}
          <div className="auth-view-text" onClick={handleScreen}>
            {AT_LOGIN ? "Create an account" : "Already have an account"}
          </div>
        </div>
      </div>
    );
  }

  return props.children
}