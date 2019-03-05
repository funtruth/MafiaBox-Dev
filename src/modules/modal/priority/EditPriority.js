import React from 'react'
import './EditPriority.css'
import { connect } from 'react-redux'

import { saveAllPriorities } from '../../page/PageReducer'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import PriorityRowAdd from './components/PriorityRowAdd'
import PriorityRoleDrop from './components/PriorityRoleDrop';
import PriorityRoleDrag from './components/PriorityRoleDrag';

function EditPriority(props) {
    const workspace = props.attach
    
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    let handleSave = () => {
        props.saveAllPriorities(workspace)
        props.popModalBy(1)
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
                {workspace.map((list, yIndex) => (
                    <div key={yIndex} className="priority-row">
                        <div className="priority-gutter">
                            <PriorityRowAdd
                                {...mainProps}
                                yIndex={yIndex}
                            />
                            {yIndex}
                        </div>
                        <PriorityRoleDrop
                            {...mainProps}
                            yIndex={yIndex}
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
                    onClose={props.close}
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