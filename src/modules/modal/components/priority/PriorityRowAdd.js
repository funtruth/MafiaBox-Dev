import React from 'react'

export default function PriorityRowAdd(props) {
    const { workspace, setWorkspace, yIndex } = props
    
    function addRowBefore(index) {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    function addRowAfter(index) {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    return (
        <div className="priority-gutter-add">
            <i
                className="priority-icon mdi mdi-table-row-plus-before"
                onClick={() => addRowBefore(yIndex)}
            />
            <i
                className="priority-icon mdi mdi-table-row-plus-after"
                onClick={() => addRowAfter(yIndex)}
            />
        </div>
    )
}