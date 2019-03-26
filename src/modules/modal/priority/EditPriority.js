import React from 'react'
import './EditPriority.css'
import { connect } from 'react-redux'

import { diffPriorities } from '../../page/PageReducer'

import {
    Header,
} from '../../components/Common'

import ModalOptions from '../components/ModalOptions'
import ModalCheckSave from '../components/ModalCheckSave';
import PriorityRowAdd from './components/PriorityRowAdd'
import PriorityRoleDrop from './components/PriorityRoleDrop';
import PriorityRoleDrag from './components/PriorityRoleDrag';

function EditPriority(props) {
    const { attach, pageKey } = props
    const workspace = attach
    
    const mainProps = {
        workspace,
        setWorkspace: props.setWorkspace,
    }

    let handleSave = () => {
        props.diffPriorities(workspace)
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
                <Header text="Edit Priority"></Header>
                {workspace.map((list, yIndex) => (
                    <div key={yIndex} className="priority-row">
                        <PriorityRowAdd {...mainProps} index={yIndex}/>
                        <PriorityRoleDrop {...mainProps} index={yIndex}>
                            {list.map((item, xIndex) => (
                                <PriorityRoleDrag
                                    key={item.pageKey}
                                    item={item}
                                    pageKey={pageKey}
                                    yIndex={yIndex}
                                    xIndex={xIndex}
                                />
                            ))}
                        </PriorityRoleDrop>
                    </div>
                ))}
                <ModalOptions onSave={handleSave} onClose={props.close}/>
            </div>
        </ModalCheckSave>
    )
}

export default connect(
    null,
    {
        diffPriorities,
    }
)(EditPriority)