import React from 'react'

import { DEFAULT_LOGIC } from '../types'

import {
    Icon,
} from '../../components/Common';

export default function LogicAddBelow(props) {
    const { value, path } = props
    let handleAdd = () => {
        props.updatePage([...path, 'down'], {
            ...DEFAULT_LOGIC,
            down: value.down || "",
        })
    }

    return (
        <div className="logic-panel-add">
            <Icon className="mdi mdi-server-plus" size="l" color="grey" hover onClick={handleAdd}></Icon>
        </div>
    )
}