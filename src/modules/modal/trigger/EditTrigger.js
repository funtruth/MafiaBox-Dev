import React, { useState } from 'react'
import './EditTrigger.css'
import { connect } from 'react-redux'

import { triggerNewVars, logicType, defaultLogic } from '../../logic/types'
import { updateSourceType } from '../../common/types';

import LogicNewVars from '../../logic/components/LogicNewVars'
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';
import LogicBoard from '../../fields/components/LogicBoard';

function EditTrigger(props) {
    const { pageKey, fieldKey, indexKey, subfieldKey, attachVar } = props

    const workspace = props.attach

    let handleSave = () => {
        props.onSave()
        props.popModalBy(1)
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
                    <div className="-sep"/>
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

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(EditTrigger)