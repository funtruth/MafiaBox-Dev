import React from 'react'
import './EditTrigger.css'

import { triggerNewVars, logicType, updateType } from '../../logic/types'
import { updateSourceType } from '../../common/types';

import LogicNewVars from '../../logic/components/LogicNewVars'
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';
import LogicBoard from '../../fields/components/LogicBoard';

export default function EditTrigger(props) {
    const { path, subpath, pageKey, fieldKey, indexKey, subfieldKey, attachVar } = props

    const workspace = props.attach

    let handleSave = () => {
        props.updatePage(path.concat(subpath), {
            ...workspace,
            updateType: updateType.trigger,
        })
        props.popModalBy(1)
    }

    let updatePage = (path, value) => {
        props.setWorkspace(value, path)
    }

    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
        indexKey,
        logicInfo: {
            data: workspace,
            logicType: logicType.update.key,
        },
        pageKey,
        fieldKey,
        subfieldKey,
        value: workspace || {},
        vars: {
            ...attachVar,
            ...triggerNewVars,
        },
        path: ['attach'],
        subpath: [],
        updatePage,
        updateSource: updateSourceType.topModal,
    }
    
    return (
        <ModalCheckSave {...props} handleSave={handleSave}>
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
                    <LogicBoard {...mainProps}/>
                </div>
                <ModalOptions
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
        </ModalCheckSave>
    )
}