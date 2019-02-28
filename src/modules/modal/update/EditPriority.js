import React, { useState } from 'react'
import './EditPriority.css'
import { Droppable } from 'react-beautiful-dnd';

import { droppableType } from '../../common/types';

import ModalOptions from '../components/ModalOptions'
import PriorityRowAdd from '../components/priority/PriorityRowAdd'
import PriorityRoleDrop from '../components/priority/PriorityRoleDrop';
import PriorityRoleDrag from '../components/priority/PriorityRoleDrag';

const getEmptyListStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    padding: isDraggingOver ? '0px 12px' : '12px 12px',
    minWidth: '90%',
    maxHeight: 24,
    backgroundColor: isDraggingOver && 'red',
});

export default function EditPriority(props) {
    let [workspace, setWorkspace] = useState(props.attach)
    
    let handleSave = () => {
        props.onSave()
        props.popModalBy(1)
    }

    return (
        <div
            cancel-appclick="true"
            style={{
                minWidth: 600,
                width: '75vw',
            }}
        >
            {workspace.map((list, yIndex) => {
                return (
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
                )
            })}
            <ModalOptions
                onSave={handleSave}
                onClose={props.onClose}
            />
        </div>
    )
}