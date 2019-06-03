import React, { useState } from 'react'
import _ from 'lodash'

import {
    dropdownType,
    parseType,
    comparisonType,
    logicType,
    operatorType,
} from '../../common/types'
import {
    rssMap,
    LOGIC_ITEM_VAR,
    DEFAULT_VAR_ID,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ, getVarTypeIcon } from '../../common/arrows';
import { parseJS, concatField } from '../../logic/proptool';
import { useAutofocus } from '../../hooks/Hooks'
import generatePushID from '../../common/generatePushID';
import { checkAlpha } from '../../common/helpers';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
    DropSubmit,
} from '../components/Common'
import { Row } from '../../components/Common'

//Used from: LogicPanels
export default function PickVar({
    slate,
    rootPath,
    path,
    parseBy,
    logicItem,
    varItem,
    scopedVars,
    showDropdown,
    updateGeneral,
}){
    const type = logicItem.operatorType || logicItem.logicType

    //
    const getLeftParser = () => {
        switch(type) {
            case logicType.update:
                return parseType.update;
            case logicType.variable:
                return parseType.variable;
            default:
                return ""
        }
    }

    const handleSelect = (item) => {
        switch(parseBy) {
            case parseType.collection:
                const [a,b,c] = ['a','b','c'].map(generatePushID);
                const parseVarBy = getLeftParser();

                updateGeneral({
                    path: [...path, varItem.key, 'value'],
                    update: [...(varItem.value || []), a],
                }, {
                    path,
                    update: {
                        [a]: {
                            ...LOGIC_ITEM_VAR,
                            key: a,
                            display: comparisonType.assign.code,
                            parseBy: parseType.operation,
                            value: {
                                operator: comparisonType.assign.key,
                                left: b,
                                right: c,
                            },
                        },
                        [b]: {
                            ...LOGIC_ITEM_VAR,
                            key: b,
                            display: parseJS(item.key),
                            value: item.key,
                            nativeValue: item.key,
                            parseBy: parseVarBy,
                            variableTypes: item.variableTypes,
                        },
                        [c]: {
                            ...LOGIC_ITEM_VAR,
                            key: c,
                            parseBy: parseType.variable,
                        },
                    }
                })
                break;
            case parseType.variable:
                updateGeneral({
                    path,
                    update: {
                        ...LOGIC_ITEM_VAR,
                        display: parseJS(item.key),
                        value: item.key,
                        nativeValue: item.key,
                        parseBy: parseType.variable,
                        variableTypes: item.variableTypes,
                    }
                })
                break;
            default:
        }
        showDropdown();
    }

    const focusRef = useAutofocus();
    const [text, setText] = useState('')
    const handleChange = e => setText(e.target.value)

    //declaring a new variable
    const handleSave = () => {
        const isAlpha = checkAlpha(text)
        if (!isAlpha) {
            return
        }

        if (scopedVars[text]) {
            return
        }

        const variableName = concatField("", text)
        updateGeneral({
            path: [...rootPath, 'vars'],
            update: {
                [variableName]: {
                    ...DEFAULT_VAR_ID,
                    key: variableName,
                    subfield: text,
                    fields: [
                        text,
                    ],
                    fieldLength: 1,
                    scope: logicItem.key,
                },
            }
        })
        showDropdown();
    }

    const handleKeyPress = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                handleSave();
                break
            default:
        }
    }

    const renderDeclare = () => {
        switch(type) {
            case logicType.variable.key:
                return (
                    <>
                        <DropTitle>declare</DropTitle>
                        <Row sizes={['xxs', 'xs']}>
                            <input
                                ref={focusRef}
                                className="tag-input"
                                value={text}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Variable name ..."
                                type='text'
                                autoFocus
                            />
                            <DropSubmit onClick={handleSave}/>
                        </Row>
                    </>
                )
        }

        return null;
    }

    const renderAllVars = () => {
        switch(type) {
            case logicType.variable.key:
            case operatorType.if.key:
            case operatorType.elseif.key:
                const vars = _.sortBy(scopedVars, VARTYPE_IS_OBJ)

                return (
                    <>
                        <DropTitle>variables</DropTitle>
                        <DropScroll>{vars.map(renderItem)}</DropScroll>
                        <DropEmpty list={vars} text="no variables found"></DropEmpty>
                    </>
                )
        }

        return null;
    }

    const renderItem = (item) => {
        const chosen = slate.value === item.key

        if (VARTYPE_IS_OBJ(item)) {
            return (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={showDropdown}
                    params={{
                        prefix: item.key,
                        updateByPickVar: handleSelect,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={getVarTypeIcon(item.variableTypes)}
                rightCheck
                text={item.key}
            />
        )
    }
    
    const rssVars = _.filter(rssMap, i => i.fieldLength === 2)

    return (
        <>
            {renderDeclare()}
            <DropTitle>game values</DropTitle>
            <DropScroll>{rssVars.map(renderItem)}</DropScroll>
            {renderAllVars()}
        </>
    )
}