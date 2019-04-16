import React, { useState } from 'react'
import _ from 'lodash'

import { VAR_DEFAULTS } from '../../logic/types';

import * as helpers from '../../common/helpers'
import {
    START_CHAR,
    END_CHAR,
    parseJS,
    concatField,
    getSubfields,
} from '../../logic/proptool';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropSubmit,
    DropTitle,
} from '../components/Common'

export default function DeclareOrAssignVar(props) {
    const { currentValue, attachVar, path } = props

    let [value, setValue] = useState('')
    let handleChange = e => setValue(e.target.value)

    let handleSave = () => {
        const isAlpha = helpers.checkAlpha(value)
        if (!isAlpha) {
            return
        }

        if (currentValue[value]) {
            return
        }

        const variableName = START_CHAR + value + END_CHAR
        props.updatePage({
            [variableName]: {
                ...VAR_DEFAULTS,
                key: variableName,
                value: variableName,
                display: parseJS(variableName),
                variableTypes: "",
            },
        }, ['declare'])
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

    let handleSelect = (item) => {
        props.updatePage({
            [item.key]: {
                ...VAR_DEFAULTS,
                value: item.key,
                display: parseJS(item.key),
                variableTypes: item.variableTypes || "",
            },
        }, ['data'])
        props.showDropdown()
    }

    const assignable = _.filter(attachVar, i => !i.static)

    const rssSubfieldKey = concatField('', 'rss')
    const subfields = getSubfields(rssSubfieldKey)

    return (
        <>
            <DropTitle>declare</DropTitle>
            <div className="row" style={{marginBottom: 6}}>
                <input
                    className="tag-input"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Variable name ..."
                    type='text'
                    autoFocus
                />
                <DropSubmit
                    onClick={handleSave}
                    icon="mdi mdi-checkbox-marked-outline"
                >
                    save
                </DropSubmit>
            </div>
            <DropTitle>assign</DropTitle>
            {subfields.map(item => (
                <DropParent
                    {...props}
                    key={item.subfield}
                    dropdownType={item.dropdown}
                    params={{
                        path: [...path, 'data'],
                        subfieldKey: concatField(rssSubfieldKey, item.subfield),
                        subpath: [concatField(rssSubfieldKey, item.subfield)],
                    }}
                    text={item.subfield}
                />
            ))}
            <DropScroll>
                {assignable.map(item => (
                    <DropItem
                        key={item.key}
                        onClick={() => handleSelect(item)}
                    >
                        {item.key}
                    </DropItem>
                ))}
                <DropEmpty>no assignable vars ...</DropEmpty>
            </DropScroll>
        </>
    )
}