import React, { useState } from 'react'
import _ from 'lodash'

import * as helpers from '../../common/helpers'

import DropTitle from '../components/DropTitle'
import DropItem from '../components/DropItem'
import DropScrollable from '../components/DropScrollable'
import DropEmpty from '../components/DropEmpty';

export default function DeclareVar(props) {
    let [value, setValue] = useState('')
    let handleChange = e => setValue(e.target.value)

    let handleSave = () => {
        const { currentValue } = props

        const isAlpha = helpers.checkAlpha(value)
        
        if (!isAlpha) {
            return
        }

        if (currentValue[value]) {
            return
        }

        props.updatePage({
            [value]: {
                key: value,
                variableTypes: [],
                isNotDefault: true,
            }
        })
        props.showDropdown()
    }

    let handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSave()
                break
            default:
        }
    }

    const assignable = _(props.attachVar)
        .filter(i => i.isNotDefault)
        .value()
    
    let handleSelect = (item) => {
        props.updatePage({
            [item.key]: {
                ...item,
                isBeingAssigned: true,
            }
        })
        props.showDropdown()
    }

    return (
        <div>
            <DropTitle>declare</DropTitle>
            <input
                className="tag-input"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Variable name ..."
                type='text'
                autoFocus
                style={{
                    marginBottom: 6,
                }}
            />
            <DropItem
                leftIcon="mdi mdi-checkbox-marked-outline"
                onClick={handleSave}
            >
                save variable
            </DropItem>
            <DropTitle>assign</DropTitle>
            <DropScrollable>
                {assignable.map(item => (
                    <DropItem
                        key={item.key}
                        onClick={() => handleSelect(item)}
                    >
                        {item.key}
                    </DropItem>
                ))}
                <DropEmpty>no assignable vars ...</DropEmpty>
            </DropScrollable>
        </div>
    )
}