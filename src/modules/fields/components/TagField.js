import React from 'react'
import _ from 'lodash'

export default function TagField(props) {
    const { path, value, data } = props

    if (!data) return null
    const tags = _.sortBy(data, i => i.index)

    let handleClick = (item) => {
        props.updatePage(path, item.key)
    }
    
    return (
        <div className="row -x-p">
            {tags.map(item => {
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
            })}
        </div>
    )
}