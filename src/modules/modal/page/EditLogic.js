import React from 'react'
import { connect } from 'react-redux'

import {
    logicType,
    updateType,
} from '../../common/types'
import { triggerNewVars } from '../../common/defaults'

import LogicView from '../../logic/LogicView';
import LogicNewVars from '../../logic/components/LogicNewVars'
import ModalOptions from '../components/ModalOptions';
import ModalCheckSave from '../components/ModalCheckSave';

function EditLogic(props) {
    const { page, path } = props //hook up modal to reducer through path

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
                    <LogicView
                        {...props}
                        logicRepo={value}
                        logicKey=""
                        parentKey=""
                        childKeys={value.childKeys}
                        vars={vars}
                    />
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
        page: state.page,
    })
)(EditLogic)