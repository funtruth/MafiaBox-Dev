import React from 'react'

import { Icon } from '../../../components/Common';

export default function PriorityRowOptions({ workspace, setWorkspace, index }) {
    //function addBefore() {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    function remove() {setWorkspace(workspace.slice(0, index).concat(workspace.slice(index + 1)))}
    function addAfter() {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    return (
        <div className="priority-row-options">
            <Icon
                className="mdi mdi-playlist-plus hovering"
                color="grey" size="xl"
                hover onClick={addAfter}
            ></Icon>
            <Icon
                className="mdi mdi-close hovering"
                color="grey" size="xl" style={{marginLeft: 4}}
                hover onClick={remove}
            ></Icon>
        </div>
    )
}