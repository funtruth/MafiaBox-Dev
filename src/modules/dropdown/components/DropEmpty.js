import React from 'react'
import _ from 'lodash'

export default function DropEmpty({list, text}) {
    if (_.isArray(list)) {
        if (list.length > 0) return null
    }
    return <div className="drop-down-empty">{text}</div>
}