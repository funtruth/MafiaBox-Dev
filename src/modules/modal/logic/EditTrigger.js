import React from 'react'

import LogicView from '../../logic/LogicView';
import ModalOptions from '../components/ModalOptions';
import { Text, Body } from '../../components/Common';

export default function EditTrigger(props) {
    const { path } = props
    
    return (
        <Body
            style={{
                minWidth: 600,
                width: '75vw',
            }}
        >
            <div className="border-right -t-m">
                <Text>NEW VARIABLES</Text>
            </div>
            <div className="-sep"/>
            <div>
                <LogicView path={path}/>
            </div>
            <ModalOptions/>
        </Body>
    )
}