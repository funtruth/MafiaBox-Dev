import React from 'react'
import './EditHealth.css'

import StringDashboard from '../../strings/StringDashboard';
import ModalOptions from '../components/ModalOptions'
import Body from '../../components/Body';

export default function EditHealth(props) {
    return (
        <Body
            style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 600,
                width: '75vw',
            }}
        >
            <StringDashboard {...props}/>
            <ModalOptions/>
        </Body>
    )
}