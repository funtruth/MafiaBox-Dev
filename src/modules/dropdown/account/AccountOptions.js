import React from 'react'
import firebase from 'firebase/app'

import DropItem from '../components/DropItem'
import DropTitle from '../components/DropTitle'

export default function AccountOptions(props) {
    let handleLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <>
            <DropTitle>options</DropTitle>
            <DropItem onClick={handleLogout} leftIcon="mdi mdi-logout" text="Log out"/>
        </>
    )
}