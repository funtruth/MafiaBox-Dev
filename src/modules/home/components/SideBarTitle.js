import React from 'react'

import { Row, Text } from '../../components/Common';

export default function SideBarTitle({text}) {
    return (
        <Row y="c">
            <div style={{
                height: 2,
                width: 10,
                backgroundColor: '#464646',
                marginRight: 2,
            }}/>
            <Text>{text}</Text>
            <div style={{
                height: 2,
                flexGrow: 1,
                backgroundColor: '#464646',
                minWidth: 10,
                marginLeft: 2,
            }}/>
        </Row>
    )
}