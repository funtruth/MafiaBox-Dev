import React, { useState } from 'react'
import _ from 'lodash'

import {
    mathType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/types';
import { VAR_DEFAULTS } from '../../logic/types';

import * as helpers from '../../common/helpers'
import {
    START_CHAR,
    END_CHAR,
    parseJS,
    concatField,
} from '../../logic/proptool';

import {
    DropEmpty,
    DropItem,
    DropTitle,
    DropScroll,
    DropSubmit,
} from '../components/Common'
import ShowSubfields from '../update/ShowSubfields'

export default function DeclareOrAssignVar(props) {
    const { currentValue, attachVar } = props

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
            declare: {
                [variableName]: {
                    ...VAR_DEFAULTS,
                    value: variableName,
                    display: parseJS(variableName),
                    variableTypes: "",
                    assign: {
                        ...DEFAULT_ASSIGN,
                        mathType: mathType.NaN.key,
                    },
                },
            },
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

    let handleSelect = (item) => {
        props.updatePage({
            assign: {
                [item.key]: {
                    ...VAR_DEFAULTS,
                    value: item.key,
                    display: parseJS(item.key),
                    variableTypes: item.variableTypes || "",
                    assign: DEFAULT_ASSIGN,
                },
            },
        })
        props.showDropdown()
    }

    const assignable = _.filter(attachVar, i => !i.static)

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
            <ShowSubfields {...props} subfieldKey={concatField('', 'rss')}/>
            <DropTitle>assign</DropTitle>
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