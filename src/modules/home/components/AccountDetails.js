import React from 'react'

import { dropdownType } from '../../dropdown/types'

export default function SideBarView(props) {
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