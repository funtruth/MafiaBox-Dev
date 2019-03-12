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
            <div>
                {firstName}
                <div className="project-subtitle">
                    {email}
                </div>
            </div>
            <i
                className="mdi mdi-dots-vertical"
                style={{
                    marginLeft: 'auto',
                    fontSize: 18,
                }}
            ></i>
        </div>
    )
}