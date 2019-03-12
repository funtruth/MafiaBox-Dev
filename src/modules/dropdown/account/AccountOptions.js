import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import DropItem from '../components/DropItem'
import DropTitle from '../components/DropTitle'

function AccountOptions(props) {
    let handleLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <div>
            <DropTitle>options</DropTitle>
            <DropItem
                onClick={handleLogout}
                leftIcon="mdi mdi-logout"
            >
                Log out
            </DropItem>
        </div>
    )
}

export default connect(
    state => ({

    })
)(AccountOptions)