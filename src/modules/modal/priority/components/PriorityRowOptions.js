import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../types'

import { Icon } from '../../../components/Common';

import { showModal } from '../../ModalReducer'

function PriorityRowOptions({ workspace, setWorkspace, index, showModal }) {
    //function addBefore() {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    
    function moveToBottom() {
        setWorkspace([
            ...workspace.slice(0, index),
            ...workspace.slice(index + 1, workspace.length - 1),
            workspace[workspace.length - 1].concat(workspace[index]),
        ])
    }

    function remove() {
        if (workspace[index].length) {
            showModal(modalType.removePriorityRow, {
                onSave: moveToBottom,
            })
        } else {
            setWorkspace(workspace.slice(0, index).concat(workspace.slice(index + 1)))
        }
    }

    function addAfter() {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    return (
        <div className="priority-row-options">
            <Icon
                icon="playlist-plus" className="hovering" title="Add row below"
                color="grey" size="xl" style={{marginLeft: 8}}
                hover onClick={addAfter}
            ></Icon>
            <Icon
                icon="close" className="hovering" title="Delete row"
                color="grey" size="xl" style={{marginLeft: 4, marginRight: 8}}
                hover onClick={remove}
            ></Icon>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(PriorityRowOptions)