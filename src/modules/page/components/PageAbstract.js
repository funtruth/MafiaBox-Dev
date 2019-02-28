import React from 'react'

export default function PageAbstract(props) {
    const { path, pageInfo } = props
    const { title } = pageInfo

    let handleChange = e => {
        props.updatePage([path, 'title'], e.target.value)
    }

    return (
        <input
            className="page-title-input"
            value={title || ''}
            onChange={handleChange}
            placeholder="Untitled"
            type="text"
            autoFocus={true}
        />
    )
}