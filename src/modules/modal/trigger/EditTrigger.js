import React, { useState } from 'react'
import './EditTrigger.css'
import { connect } from 'react-redux'

import { triggerNewVars, logicType } from '../../logic/types'
import { StatefulSourceId } from '../../dropdown/types'

import { getUpdateCode } from '../../logic/LogicReducer'

import LogicNewVars from '../../logic/components/LogicNewVars'
import LogicObject from '../../logic/form/LogicObject';
import CodeField from '../../code/components/CodeField';
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';
import DropdownView from '../../dropdown/DropdownView';

var beautify_js = require('js-beautify');

function EditTrigger(props) {
    let [workspace, setWorkspace] = useState('')

    const { pageKey, fieldKey, indexKey, subfieldKey, attach, attachVar, path, updateRef } = props

    let handleSave = () => {
        props.onSave()
        props.popModalBy(1)
    }

    const data = attach && attach.value
    const iprops = {
        indexKey,
        logicInfo: {
            data,
            logicType: logicType.update.key,
        },
        pageKey,
        fieldKey,
        subfieldKey,
        vars: {
            ...attachVar,
            ...triggerNewVars,
        },
        path,
    }
    
    const code = beautify_js(getUpdateCode(data), {brace_style: 'end-expand'})
    
    return (
        <ModalCheckSave
            {...props}
        >
            <div
                cancel-appclick="true"
            >
                <div className="row">
                    <div className="border-right -t-m">
                        <div className="dashboard-section-title">VARIABLES</div>
                        <div className="-x-p">
                            <LogicNewVars newVars={attachVar}/>
                        </div>
                        <div className="-sep"/>
                        <div className="dashboard-section-title">NEW VARIABLES</div>
                        <div className="-x-p">
                            <LogicNewVars newVars={triggerNewVars}/>
                        </div>
                        <div className="-sep"/>
                        <div className="dashboard-section-title">UPDATES ON TRIGGER</div>
                        <div className="-x-p -y-p">
                            <LogicObject {...iprops} updateRef={updateRef}/>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#272822', padding: '10px 8px 10px 0px' }}>
                        <CodeField
                            code={code}
                            options={{
                                readOnly: 'nocursor',
                            }}
                        />
                    </div>
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