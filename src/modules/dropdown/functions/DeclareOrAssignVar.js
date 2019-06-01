import React, { useState } from 'react'
import _ from 'lodash'

import {
    LOGIC_ITEM_VAR,
    DEFAULT_VAR_ID,
} from '../../common/defaults';

import * as helpers from '../../common/helpers'
import {
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
import Row from '../../components/Row';
import { parseType } from '../../logic/types';

//TODO this is invalid
export default function DeclareOrAssignVar({
    logicItem,
    path,
    rootPath,
    scopedVars,
    showDropdown,
    updateGeneral,
}){
    let [value, setValue] = useState('')
    let handleChange = e => setValue(e.target.value)

    //declaring a new variable
    let handleSave = () => {
        const isAlpha = helpers.checkAlpha(value)
        if (!isAlpha) {
            return
        }

        if (scopedVars[value]) {
            return
        }

        const variableName = concatField("", value)
        updateGeneral({
            path: [...rootPath, 'vars'],
            update: {
                [variableName]: {
                    ...DEFAULT_VAR_ID,
                    key: variableName,
                    subfield: value,
                    fields: [
                        value,
                    ],
                    fieldLength: 1,
                    scope: logicItem.key,
                },
            }
        })
        showDropdown();
    }

    let handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSave();
                break
            default:
        }
    }

    let handleSelect = (item) => {
        updateGeneral({
            path: [...path, 'data'],
            update: {
                [item.key]: {
                    ...LOGIC_ITEM_VAR,
                    value: item.key,
                    nativeValue: item.key,
                    display: parseJS(item.key),
                    parseBy: parseType.variable,
                    variableTypes: item.variableTypes || "",
                },
            }
        })
        showDropdown();
    }

    const assignable = _.filter(scopedVars, i => !i.static)

    const rssSubfieldKey = concatField('', 'rss')
    const subfields = getSubfields(rssSubfieldKey)

    return (
        <>
            <DropTitle>declare</DropTitle>
            <Row sizes={['xxs', 'xs']}>
                <input
                    className="tag-input"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Variable name ..."
                    type='text'
                    autoFocus
                />
                <DropSubmit onClick={handleSave}/>
            </Row>
            <DropTitle>assign</DropTitle>
            {subfields.map(item => (
                <DropParent
                    key={item.subfield}
                    dropdown={item.dropdown}
                    showDropdown={showDropdown}
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
                        text={item.key}
                    />
                ))}
                <DropEmpty list={assignable.concat(subfields)} text="no assignable vars ..."/>
            </DropScroll>
        </>
    )
}