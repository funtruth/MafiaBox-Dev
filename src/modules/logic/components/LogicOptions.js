import React from 'react'

export default function LogicOptions(props) {
    const { value, path } = props

    let handleDelete = () => props.updatePage(path, value.down)

    return (
        <div>
            <i 
                className="logic-option mdi mdi-window-close"
                onClick={handleDelete}
            />
        </div>
    )
}