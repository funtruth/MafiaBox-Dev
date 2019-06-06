import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useDispatch } from 'react-redux'
import firebase from 'firebase/app'

import { userListener, userProjectsListener, projectUsersListener } from '../firebase/FirebaseReducer'

import AuthLogin from './components/AuthLogin';
import AuthRegister from './components/AuthRegister';

const AUTH_STATE = {
    pending: 'pending',
    loggedIn: 'loggedIn',
    notLoggedIn: 'notLoggedIn',
}

const AUTH_SCREEN = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export default function AuthWrapper({children}) {
	const dispatch = useDispatch();

	let [authState, setAuthState] = useState(AUTH_STATE.pending)
	let [authScreen, setAuthScreen] = useState(AUTH_SCREEN.LOGIN)

	const AT_LOGIN = authScreen === AUTH_SCREEN.LOGIN

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setAuthState(AUTH_STATE.loggedIn)
				const { uid } = user

				const refs = [];
				const userRef = firebase.database().ref(`users/${uid}`)
				const userProjectsRef = firebase.database().ref(`userProjects/${uid}`)
				refs.push(userRef)
				refs.push(userProjectsRef)

				userRef.on('value', snap => dispatch(userListener(snap.val())))
				userProjectsRef.on('value', snap => dispatch(userProjectsListener(snap)))
				userProjectsRef.on('child_added', snap => {
					const projectUsersRef = firebase.database().ref(`projectUsers/${snap.key}`)
					projectUsersRef.on('value', snap => dispatch(projectUsersListener(snap)))
					refs.push(projectUsersRef)
				})

				return (() => {
					refs.forEach(ref => ref && ref.off())
				})
			} else {
				setAuthState(AUTH_STATE.notLoggedIn);
			}
		})
	}, [dispatch])

	let handleScreen = () => {
		if (AT_LOGIN) {
			setAuthScreen(AUTH_SCREEN.REGISTER)
		} else {
			setAuthScreen(AUTH_SCREEN.LOGIN)
		}
	}

	if (authState === AUTH_STATE.loggedIn) {
		return children
	}

	if (authState === AUTH_STATE.notLoggedIn) {
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