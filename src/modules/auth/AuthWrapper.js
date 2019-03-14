import React, { useState, useEffect } from 'react';
import './Auth.css';
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import { AUTH_SCREEN } from './AuthConstants'

import { userListener, userProjectsListener } from '../firebase/FirebaseReducer'

import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';

function AuthWrapper(props) {
	let [authState, setAuthState] = useState("")
	let [authScreen, setAuthScreen] = useState(AUTH_SCREEN.LOGIN)

	const AT_LOGIN = authScreen === AUTH_SCREEN.LOGIN

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setAuthState("loggedIn")
				const { uid } = user
				const userRef = firebase.database().ref(`users/${uid}`)
				const projectRef = firebase.database().ref(`userProjects/${uid}`)

				userRef.on('value', snap => props.userListener(snap.val()))
				projectRef.on('value', snap => props.userProjectsListener(snap.val()))

				return () => {
					if (userRef) userRef.off()
					if (projectRef) projectRef.off()
				};
			} else {
				setAuthState("notLoggedIn")
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

	if (authState === 'loggedIn') {
		return props.children
	}

	if (authState === 'notLoggedIn') {
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
	
	return <div className="auth-wrapper"></div>
}

export default connect(
	null,
	{
		userListener,
		userProjectsListener,
	}
)(AuthWrapper)