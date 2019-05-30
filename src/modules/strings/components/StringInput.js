import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import { ITEM_TYPE } from '../types'
import { DEFAULT_STRING } from '../defaults'

import { updateGeneral } from '../../page/PageReducer'
import { genUID } from '../../common/helpers';

export default function StringInput(props) {
    const dispatch = useDispatch()
    const { stringRepo, stringMap, path, activeKey, color } = props

    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        if (activeKey === '') {
            setText('')
            setDisabled(false)
        } else {
            const selectedItem = stringRepo[activeKey] || {}
            const { string, type } = selectedItem

            switch(type) {
                case ITEM_TYPE.string:
                    setText(string)
                    setDisabled(false)
                    break
                case ITEM_TYPE.variable:
                    setText('Variable selected.')
                    setDisabled(true)
                    break
                default:
            }
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
            
            dispatch(updateGeneral({
                path,
                update: {
                    byId: repoClone,
                    byIndex: mapClone,
                },
            }))
        } else {
            dispatch(updateGeneral({
                path: [...path, 'byId', activeKey],
                update: {
                    string: text,
                }
            }))
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
            readOnly={disabled}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a string and press enter ..."
            type="text"
        />
    )
}