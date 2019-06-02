import React from 'react'
import './EditTrigger.css'

import LogicView from '../../logic/LogicView';
import ModalOptions from '../components/ModalOptions';
import { Text } from '../../components/Common';

export default function EditTrigger(props) {
    const { path } = props
    
    return (
        <div
            style={{
                minWidth: 600,
                width: '75vw',
            }}
        >
            <div className="border-right -t-m">
                <Text>NEW VARIABLES</Text>
            </div>
            <div className="-sep"/>
            <div className="edit-trigger-board">
                <LogicView path={path}/>
            </div>
            <ModalOptions
                onClose={props.onClose}
            />
        </div>
    )
}