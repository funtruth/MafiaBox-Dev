import React from 'react'

import { Icon } from '../../../components/Common';

export default function PriorityRowOptions({ workspace, setWorkspace, index }) {
    function addBefore() {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    function addAfter() {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    return (
        <div className="priority-row-options">
            <Icon className="mdi mdi-table-row-plus-before" color="grey" size="l" hover onClick={addBefore}></Icon>
            <Icon className="mdi mdi-table-row-plus-after" color="grey" size="l" hover onClick={addAfter}></Icon>
        </div>
    )
}