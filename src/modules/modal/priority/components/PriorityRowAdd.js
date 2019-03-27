import React from 'react'

import { Body, Icon } from '../../../components/Common';

export default function PriorityRowAdd({ workspace, setWorkspace, index }) {
    function addBefore() {setWorkspace([...workspace.slice(0, index), [], ...workspace.slice(index)])}
    function addAfter() {setWorkspace([...workspace.slice(0, index + 1), [], ...workspace.slice(index + 1)])}

    const topStyle = {
        position: 'absolute',
        cursor: 'pointer',
        top: -8,
    }

    const botStyle = {
        position: 'absolute',
        cursor: 'pointer',
        bottom: -8,
    }

    return (
        <Body className="priority-gutter-add" size="xs" align="c">
            <Icon
                className="mdi mdi-table-row-plus-before hovering"
                color="grey" size="l" style={topStyle}
                hover onClick={addBefore}
            />
            <Icon className="mdi mdi-arrow-all" color="grey" size="xxl"></Icon>
            <Icon
                className="mdi mdi-table-row-plus-after hovering"
                color="grey" size="l" style={botStyle}
                hover onClick={addAfter}
            />
        </Body>
    )
}