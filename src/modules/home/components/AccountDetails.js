import React from 'react'
import { useSelector } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { DropClick, Row, Icon, Text, Body } from '../../components/Common';

export default function SideBarView() {
    const authUser = useSelector(state => state.firebase.authUser)
    const { firstName, email } = authUser

    return (
        <DropClick
            dropdown={dropdownType.accountOptions}
            place="right"
        >
            <Row y="c" sizes={["s", "s"]}>
                <Body>
                    <Text>{firstName}</Text>
                    <Text color="grey" size="xs">{email}</Text>
                </Body>
                <Icon size="l" icon="mdi mdi-dots-vertical" style={{marginLeft: 'auto'}}></Icon>
            </Row>
        </DropClick>
    )
}