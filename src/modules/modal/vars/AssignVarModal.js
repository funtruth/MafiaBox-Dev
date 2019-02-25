import React, { useState } from 'react'
import './AssignVarModal.css'
import _ from 'lodash'

import { basicOpType, DEFAULT_ASSIGN } from './components/ops'

import ModalOptions from '../components/ModalOptions'
import ActiveOp from './components/ActiveOp'
import PlaygroundDroppable from './components/PlaygroundDroppable';
import BasicOpDraggable from './components/BasicOpDraggable';
import VarValueDraggable from './components/VarValueDraggable'

export default function AssignVarModal(props) {
    let [workspace, setWorkspace] = useState(props.attach)
    const { attachVar } = props

    const variableInfo = workspace || { variableTypes: [], assign: DEFAULT_ASSIGN }
    const { variableTypes, assign } = variableInfo

    const assignable = _(attachVar)
        .filter(i => i.isNotDefault)
        .value()

    let [error, setError] = useState('')

    let handleSave = () => {
        props.onSave(workspace)
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
                <div className="-y-p border-right">
                    <div className="dashboard-section-title">variable</div>
                    <div className="-x-p">
                        <div className="assign-var-tag">{workspace.key}</div>
                    </div>
                </div>
                <div className="-y-p">
                    <div className="dashboard-section-title">types</div>
                    <div className="-x-p">
                        {variableTypes.map(item => (
                            <div key={item} className="assign-var-tag">{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="-sep-no-m"></div>
            <PlaygroundDroppable
                workspace={workspace}
                setWorkspace={setWorkspace}
            >
                <ActiveOp
                    opInfo={assign}
                    subpath={['assign']}
                    setError={setError}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                />
            </PlaygroundDroppable>
            <div className="-sep-no-m"></div>
            <div className="-y-p">
                <div className="dashboard-section-title">BASIC OPERATIONS</div>
                <div className="row -x-p">
                    {_.toArray(basicOpType).map(item => (
                        <BasicOpDraggable key={item.key} item={item}/>
                    ))}
                </div>
            </div>
            <div className="-sep-no-m"></div>
            <div className="-y-p">
                <div className="dashboard-section-title">VARIABLES</div>
                <div className="row -x-p">
                    {assignable.map(item => <VarValueDraggable key={item.key} item={item}/>)}
                </div>
            </div>
            <ModalOptions
                errorMessage={error}
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}