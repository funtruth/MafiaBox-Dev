import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { navigate } from '../../navigation/NavReducer'

function SideBarView(props) {
    const { authUser } = props
    const { firstName, email } = authUser

    return (
        <div
            className="account-details app-onclick"
            menu-type={dropdownType.accountOptions}
        >
            {firstName || email}
            <i className="mdi mdi-dots-vertical" style={{ marginLeft: 'auto' }}></i>
        </div>
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