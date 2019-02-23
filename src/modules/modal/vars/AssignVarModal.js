import React, { useState } from 'react'
import './AssignVarModal.css'
import _ from 'lodash'

import { basicOpType, DEFAULT_ASSIGN } from './calc/ops'

import ModalOptions from '../components/ModalOptions'
import ActiveOp from './calc/ActiveOp'
import InactiveOp from './calc/InactiveOp';

export default function AssignVarModal(props) {
    const { attachVar, attach } = props

    const variableInfo = attach || { variableTypes: [], assign: DEFAULT_ASSIGN }
    const { variableTypes, assign } = variableInfo

    const assignable = _(attachVar)
        .filter(i => i.isNotDefault)
        .value()

    let [error, setError] = useState('')

    let handleSave = () => {
        props.onSave(props.attach)
        props.popModalBy(1)
    }
    
    return (
        <div
            cancel-appclick="true"
            style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 600,
                width: '45vw',
            }}
        >
            <div className="row">
                <div className="dashboard-section-title">VARIABLE</div>
                <div className="assign-var-tag">{attach.key}</div>
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">TYPES</div>
                {variableTypes.map(item => (
                    <div
                        key={item}
                        className="assign-var-tag"
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">SET VARIABLE TO</div>
                <ActiveOp opInfo={assign} subpath={[]} setError={setError}/>
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">BASIC OPERATIONS</div>
                {_.toArray(basicOpType).map(item => <InactiveOp key={item.key} {...item}/>)}
            </div>
            <div className="-sep"></div>
            <div className="row">
                <div className="dashboard-section-title">VARIABLES</div>
                {assignable.map(item => (
                    <div
                        key={item.key}
                        className="assign-var-tag"
                    >
                        {item.key}
                    </div>
                ))}
            </div>
            <ModalOptions
                errorMessage={error}
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}