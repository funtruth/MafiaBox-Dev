import React from 'react'
import PageView from '../../page/PageView'
import Body from '../../components/Body';

export default function PageModal(props) {
    return (
        <Body
            style={{
                flex: 1,
                minHeight: 400,
                minWidth: 600,
                height: '80vh',
                width: '65vw',
                overflow: 'scroll',
            }}
        >
            <PageView {...props}/>
        </Body>
    )
}