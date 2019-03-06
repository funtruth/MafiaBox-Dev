import React from 'react'

import { DEFAULT_LOGIC } from '../types';

export default function LogicOptions(props) {
    const { value, path } = props

    let handleDelete = () => {
        props.updatePage(path, Object.assign({}, DEFAULT_LOGIC, value.down))
    }

    return (
        <div>
            <i 
                className="logic-option mdi mdi-window-close"
                onClick={handleDelete}
            />
        </div>
    )
}