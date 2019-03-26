import React from 'react'

import { Body } from '../../../components/Common';

export default function PriorityRowAdd({ workspace, setWorkspace, index }) {
    function addRowBefore() {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    function addRowAfter() {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    return (
        <Body className="priority-gutter-add">
            <i className="priority-icon mdi mdi-table-row-plus-before" onClick={addRowBefore}/>
            <i className="priority-icon mdi mdi-table-row-plus-after" onClick={addRowAfter}/>
        </Body>
    )
}