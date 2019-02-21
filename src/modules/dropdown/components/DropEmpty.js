import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

const EMPTY_CLASSES = [
    'drop-title',
]

export default function DropEmpty(props) {
    let emptyEl = useRef(null)
    let [visible, setVisible] = useState(true)

    //if there is previous sibling, and previous sibling is not title
    useEffect(() => {
        if (emptyEl.current && emptyEl.current.previousElementSibling) {
            if (!_.some(EMPTY_CLASSES, i => emptyEl.current.previousElementSibling.classList.contains(i))) {
                setVisible(false)
            }
        }
    })

    if (!visible) return null
    return <div ref={emptyEl} className="drop-down-empty">{props.children}</div>
}