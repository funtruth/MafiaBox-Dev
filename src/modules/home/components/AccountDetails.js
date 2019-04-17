import React from 'react'

import { dropdownType } from '../../dropdown/types'

import { DropClick } from '../../components/Common';

export default function SideBarView(props) {
    const { authUser } = props
    const { firstName, email } = authUser

    return (
        <DropClick
            className="account-details"
            dropdown={dropdownType.accountOptions}
            place="right"
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
        </DropClick>
    )
}