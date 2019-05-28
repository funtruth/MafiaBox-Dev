import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { ITEM_TYPE } from '../types'
import { DEFAULT_STRING } from '../defaults'

import { genUID } from '../../common/helpers';

export default function StringInput(props) {
    const { stringRepo, stringMap, path, updateGeneral, activeKey, color } = props

    const [text, setText] = useState('')
    useEffect(() => {
        if (activeKey === '') {
            setText('')
        } else {
            const selectedItem = stringRepo[activeKey] || {}
            const { string } = selectedItem

            setText(string)
        }
    }, [activeKey])

    let handleSubmit = () => {
        if (!text) return;

        if (activeKey === '') {
            let repoClone = _.cloneDeep(stringRepo || {})
            let mapClone = _.cloneDeep(stringMap || [])
    
            const newKey = genUID('string', stringRepo)
    
            mapClone.push(newKey)
            repoClone[newKey] = {
                ...DEFAULT_STRING,
                key: newKey,
                string: text,
                type: ITEM_TYPE.string,
                color,
            }
            
            updateGeneral(path, {
                byId: repoClone,
                byIndex: mapClone,
            })
        } else {
            updateGeneral([...path, 'byId', activeKey], {
                string: text,
            })
        }

        setText('')
    }

    let handleKey = (e) => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                e.preventDefault();
                handleSubmit();
                break
            default:
        }
    }

    return (
        <textarea
            id="event-editor-textarea"
            className="dashboard-input"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a string and press enter ..."
            type="text"
        />
    )
}