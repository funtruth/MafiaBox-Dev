import React from 'react'

import LogicView from '../../logic/LogicView';
import ModalOptions from '../components/ModalOptions';
import { Text } from '../../components/Common';

export default function EditLogic(props) {
    const { path, subpath } = props
    
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
                <LogicView path={path.concat(subpath)}/>
            </div>
            <ModalOptions
                onClose={props.onClose}
            />
        </div>
    )
}