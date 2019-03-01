import React, { useState } from 'react'
import './EditPriority.css'
import _ from 'lodash'
import { connect } from 'react-redux'

import { saveAllPriorities } from '../../page/PageReducer'

import ModalOptions from '../components/ModalOptions'
import PriorityRowAdd from '../components/priority/PriorityRowAdd'
import PriorityRoleDrop from '../components/priority/PriorityRoleDrop';
import PriorityRoleDrag from '../components/priority/PriorityRoleDrag';
import ModalCheckSave from '../components/ModalCheckSave';

function EditPriority(props) {
    let [workspace, setWorkspace] = useState(_.cloneDeep(props.attach))
    
    let handleSave = () => {
        props.saveAllPriorities(workspace)
        props.popModalBy(1)
    }

    let handleClose = () => props.popModalBy(1)
    
    return (
        <ModalCheckSave
            {...props}
            past={props.attach}
            current={workspace}
            handleSave={handleSave}
        >
            <div
                cancel-appclick="true"
                style={{
                    minWidth: 600,
                    width: '75vw',
                }}
            >
                {workspace.map((list, yIndex) => (
                    <div key={yIndex} className="priority-row">
                        <div className="priority-gutter">
                            <PriorityRowAdd
                                yIndex={yIndex}
                                workspace={workspace}
                                setWorkspace={setWorkspace}
                            />
                            {yIndex}
                        </div>
                        <PriorityRoleDrop
                            yIndex={yIndex}
                            workspace={workspace}
                            setWorkspace={setWorkspace}
                        >
                            {list.map((item, xIndex) => (
                                <PriorityRoleDrag
                                    key={item.pageKey}
                                    item={item}
                                    yIndex={yIndex}
                                    xIndex={xIndex}
                                />
                            ))}
                        </PriorityRoleDrop>
                    </div>
                ))}
                <ModalOptions
                    onSave={handleSave}
                    onClose={handleClose}
                />
            </div>
        </ModalCheckSave>
    )
}

export default connect(
    null,
    {
        saveAllPriorities,
    }
)(EditPriority)