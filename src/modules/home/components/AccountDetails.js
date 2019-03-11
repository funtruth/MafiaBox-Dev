import React from 'react'
import './SideBarView.css'
import firebase from '../../firebase/firebase'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'

function SideBarView(props) {
    let handleLogOut = () => {
        firebase.auth().signOut()
    }

    const { authUser } = props
    const { firstName, email } = authUser

    return (
        <>
            <div className="account-details">
                {firstName || email}
                <i className="mdi mdi-dots-vertical" style={{ marginLeft: 'auto' }}></i>
            </div>
            <div className="side-bar-item" onClick={handleLogOut}>
                <i className="mdi mdi-logout side-bar-icon"></i>
                <div className="side-bar-title">Sign out</div>
            </div>
        </>
    )
}

export default connect(
    state => ({
        authUser: state.firebase.authUser,
    }),
    {
        navigate,
    }
)(SideBarView)