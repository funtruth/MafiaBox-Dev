import React from 'react'
import _ from 'lodash'

export default function PropertyField(props) {
    const { path, data, value } = props

    if (!data) return null
    const tags = _.sortBy(data, i => i.index)

    let handleClick = (item) => {
        let dataClone = Object.assign({}, value)
        dataClone[item.key] = !dataClone[item.key]

        props.updatePage(path, dataClone)
    }

    return (
        <div className="row">
            {tags.map(item => {
                const active = value && value[item.key]
                
                return (
                    <div
                        key={item.key}
                        className="property-button"
                        style={{
                            backgroundColor: active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
                        }}
                        onClick={() => handleClick(item)}
                    >
                        {item.title}
                    </div>
                )
            })}
        </div>
    )
}