import React from 'react'
import _ from 'lodash'

export default function UniqueTagField(props) {
    const { path, value, data } = props

    const handleClick = (item) => props.updatePage(path, item.key)

    const renderItem = (item) => {
        const active = item.key === value

        return (
            <div
                key={item.key}
                className="field-tag"
                style={{
                    backgroundColor: active && (item.color || '#6279CA'),
                }}
                onClick={() => handleClick(item)}
            >
                {item.title || 'Untitled'}
            </div>
        )
    }

    const tags = _.sortBy(data, i => i.index)
    return (
        <div className="row -x-p">
            {tags.map(renderItem)}
        </div>
    )
}