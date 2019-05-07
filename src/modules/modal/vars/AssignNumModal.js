import React, { useState } from 'react'
import _ from 'lodash'
import './AssignNumModal.css'

import {
    mathType,
    mathOperatorType,
} from '../../common/types'
import { DEFAULT_ASSIGN } from '../../common/defaults'
import { compileMath } from '../../logic/codetool'

import { VARTYPE_IS_NUM } from '../../common/arrows';

import ModalOptions from '../components/ModalOptions'
import PlaygroundDrop from './components/PlaygroundDrop';
import BasicOpDrag from './components/BasicOpDrag';
import ValueDrag from './components/ValueDrag';
import ModalCheckSave from '../components/ModalCheckSave';

export default function AssignVarModal(props) {
    let [error, setError] = useState('')

    const { attach, attachVar, path, subfieldKey } = props
    const assign = _.cloneDeep(attach.assign || DEFAULT_ASSIGN)

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
    
    const assignable = _.filter(attachVar,VARTYPE_IS_NUM)
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
                    <ValueDrag text={subfieldKey} mathType={mathType.variable}/>
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
                        <ValueDrag text={0} mathType={mathType.number}/>
                        {assignable.map(item => (
                            <ValueDrag
                                key={item.key}
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