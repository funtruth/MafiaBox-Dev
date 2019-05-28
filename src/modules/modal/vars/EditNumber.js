import React, { useState } from 'react'
import _ from 'lodash'
import './AssignNumModal.css'

import { DEFAULT_ASSIGN } from '../../common/defaults'
import { compileMath } from '../../logic/codetool'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import NumberView from '../../numbers/NumberView';

export default function EditNumber(props) {
    let [error, setError] = useState('')

    const { attach, attachVar, path, subfieldKey } = props
    const assign = _.cloneDeep(attach.assign || DEFAULT_ASSIGN)

    const workspace = attach
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    let handleSave = () => {
        let badMath = compileMath(assign)

        if (badMath) {
            setError('You cannot have empty values.')
            return
        }

        props.updatePage(path, workspace)
        props.popModalBy(1)
    }
    
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
                <NumberView {...props}/>
                <ModalOptions
                    error={error}
                    onSave={handleSave}
                    onClose={props.close}
                />
            </div>
        </ModalCheckSave>
    )
}