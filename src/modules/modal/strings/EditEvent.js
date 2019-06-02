import React from 'react'
import './EditEvent.css'

import ModalOptions from '../components/ModalOptions'
import StringView from '../../strings/StringView';
import EditEventHeader from './components/EditEventHeader';
import { Separator } from '../../components/Common';

export default function EditEvent(props) {
    const { path, close, scopedVars } = props

    return (
        <div
            style={{
                minWidth: 600,
                width: '75vw',
                height: '60vh',
            }}
        >
            <EditEventHeader path={path}/>
            <Separator></Separator>
            <StringView
                path={[...path, 'string']}
                scopedVars={scopedVars}
            />
            <ModalOptions onClose={close}/>
        </div>
    )
}