import React, { useState } from 'react'
import _ from 'lodash'
import './AssignNumModal.css'

import {
    mathType,
    mathOperatorType,
    compileMath,
    DEFAULT_ASSIGN,
} from './components/types'

import ModalOptions from '../components/ModalOptions'
import PlaygroundDrop from './components/PlaygroundDrop';
import BasicOpDrag from './components/BasicOpDrag';
import ValueDrag from './components/ValueDrag';
import ModalCheckSave from '../components/ModalCheckSave';

export default function AssignVarModal(props) {
    let [error, setError] = useState('')

    const { attach, attachVar, path, subfieldKey } = props
    const assign = _.cloneDeep(attach.assign || DEFAULT_ASSIGN)
    console.log("workspace and assign", {attach, assign})

    const workspace = attach
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    const clearWorkspace = () => console.log('clear')
    const resetWorkspace = () => console.log('reset')

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
                    <div className="dashboard-section-title">variable</div>
                    <div className="assign-var-tag">{subfieldKey}</div>
                </div>
                <div className="-sep-no-m"></div>
                <PlaygroundDrop
                    {...mainProps}
                    assign={assign}
                    setError={setError}
                    subpath={['assign']}
                    clearWorkspace={clearWorkspace}
                    resetWorkspace={resetWorkspace}
                />
                <div className="-sep-no-m"></div>
                <div className="-y-p">
                    <div className="dashboard-section-title">BASIC OPERATIONS</div>
                    <div className="row -x-p">
                        {_.toArray(mathOperatorType).map(item => (
                            <BasicOpDrag
                                key={item.key}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
                <div className="-sep-no-m"></div>
                <div className="-y-p">
                    <div className="dashboard-section-title">VARIABLES</div>
                    <div className="row -x-p">
                        <ValueDrag value={0} text={0} mathType={mathType.number}/>
                        {assignable.map(item => (
                            <ValueDrag
                                key={item.key}
                                value={item}
                                text={item.key}
                                mathType={mathType.variable}
                            />
                        ))}
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