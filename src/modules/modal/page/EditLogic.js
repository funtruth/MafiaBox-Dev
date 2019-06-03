import React from 'react'

import LogicView from '../../logic/LogicView';
import ModalOptions from '../components/ModalOptions';
import { Body } from '../../components/Common';

export default function EditLogic({path, onClose}) {
    return (
        <div
            style={{
                minWidth: 600,
                width: '75vw',
            }}
        >
            <Body>
                <LogicView path={path}/>
            </Body>
            <ModalOptions onClose={onClose}/>
        </div>
    )
}