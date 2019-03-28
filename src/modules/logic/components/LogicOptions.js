import React from 'react'

import {
    Icon
} from '../../components/Common'

export default function LogicOptions(props) {
    const { value, path } = props
    const handleDelete = () => props.updatePage(path, value.down)

    return (
        <div>
            <Icon
                className="mdi mdi-window-close"
                style={{padding: 4}}
                size="m" color="grey"
                hover onClick={handleDelete}
            ></Icon>
        </div>
    )
}