import React, { useState } from 'react'
import _ from 'lodash'
import './AssignVarModal.css'

import {
    basicOpType,
    DEFAULT_ASSIGN,
    compileMath,
} from './components/ops'

import ModalOptions from '../components/ModalOptions'
import PlaygroundDrop from './components/PlaygroundDrop';
import BasicOpDrag from './components/BasicOpDrag';
import VarValueDrag from './components/VarValueDrag'
import ValueDrag from './components/ValueDrag';
import ModalCheckSave from '../components/ModalCheckSave';

export default function AssignVarModal(props) {
    let [error, setError] = useState('')

    const { attach, attachVar, path } = props

    const workspace = attach
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    const clearWorkspace = () => console.log('clear')
    const resetWorkspace = () => console.log('reset')

    const variableInfo = workspace || { variableTypes: [], assign: DEFAULT_ASSIGN }
    const { variableTypes, assign } = variableInfo

    let handleSave = () => {
        let badMath = compileMath(assign)

        if (badMath) {
            setError('You cannot have empty values.')
            return
        }

        props.updatePage(path, workspace)
        props.popModalBy(1)
    }
    
    const assignable = _.filter(attachVar, i => !i.static)
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    maxWidth: '90vw',
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
                <PlaygroundDrop
                    {...mainProps}
                    opInfo={assign}
                    setError={setError}
                    subpath={['assign']}
                    clearWorkspace={clearWorkspace}
                    resetWorkspace={resetWorkspace}
                />
                <div className="-sep-no-m"></div>
                <div className="-y-p">
                    <div className="dashboard-section-title">BASIC OPERATIONS</div>
                    <div className="row -x-p">
                        {_.toArray(basicOpType).map(item => (
                            <BasicOpDrag key={item.key} item={item}/>
                        ))}
                    </div>
                </div>
                <div className="-sep-no-m"></div>
                <div className="-y-p">
                    <div className="dashboard-section-title">VARIABLES</div>
                    <div className="row -x-p">
                        <ValueDrag value={0}/>
                        {assignable.map(item => <VarValueDrag key={item.key} item={item}/>)}
                    </div>
                </div>
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.close}
                />
            </div>
        </ModalCheckSave>
    )
}