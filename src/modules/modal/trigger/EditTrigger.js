import React from 'react'
import './EditTrigger.css'

import { triggerNewVars } from '../../common/defaults'

import LogicNewVars from '../../logic/components/LogicNewVars'
import LogicView from '../../logic/LogicView';
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';

export default function EditTrigger(props) {
    const { path } = props
    
    return (
        <ModalCheckSave {...props}>
            <div
                cancel-appclick="true"
                style={{
                    minWidth: 600,
                    width: '75vw',
                }}
            >
                <div className="border-right -t-m">
                    <div className="dashboard-section-title">NEW VARIABLES</div>
                    <div className="-x-p">
                        <LogicNewVars newVars={triggerNewVars}/>
                    </div>
                </div>
                <div className="-sep"/>
                <div className="edit-trigger-board">
                    <LogicView path={path}/>
                </div>
                <ModalOptions
                    onClose={props.onClose}
                />
            </div>
        </ModalCheckSave>
    )
}