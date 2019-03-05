import React, { useState } from 'react'
import './EditTrigger.css'
import { connect } from 'react-redux'

import { triggerNewVars, logicType, defaultLogic } from '../../logic/types'
import { StatefulSourceId } from '../../dropdown/types'
import { updateSourceType } from '../../common/types';

import LogicNewVars from '../../logic/components/LogicNewVars'
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';
import DropdownView from '../../dropdown/DropdownView';
import LogicBoard from '../../fields/components/LogicBoard';

function EditTrigger(props) {
    let [workspace, setWorkspace] = useState(Object.assign({}, defaultLogic, props.attach))
    console.log(workspace)
    const { pageKey, fieldKey, indexKey, subfieldKey, attachVar } = props

    let handleSave = () => {
        props.onSave()
        props.popModalBy(1)
    }

    const iprops = {
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
        path: [],
        subpath: [],
        statefulSource: StatefulSourceId.editTrigger,
        updateSource: updateSourceType.topModal,
    }
    
    return (
        <ModalCheckSave
            {...props}
        >
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
                    <LogicBoard {...iprops}/>
                </div>
                <ModalOptions
                    onSave={handleSave}
                    onClose={props.onClose}
                />
            </div>
            <DropdownView
                sourceId={StatefulSourceId.editTrigger}
                state={workspace}
                updateState={setWorkspace}
            />
        </ModalCheckSave>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(EditTrigger)