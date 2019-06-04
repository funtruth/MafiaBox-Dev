import React, { useState } from 'react'
import _ from 'lodash'

import {
    dropdownType,
    logicType,
    operatorType,
} from '../../common/types'
import {
    rssMap,
    DEFAULT_VAR_ID,
} from '../../common/defaults'

import { VARTYPE_IS_OBJ, getVarTypeIcon } from '../../common/arrows';
import { concatField } from '../../logic/proptool';
import { useAutofocus } from '../../hooks/Hooks'
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
    rootPath,//passed
    logicItem,//passed
    scopedVars,//passed
    pickVarClick,//passed
    showDropdown,
    updateGeneral,
}){
    const type = logicItem.operatorType || logicItem.logicType

    const focusRef = useAutofocus();
    const [text, setText] = useState('')
    const handleChange = e => setText(e.target.value)

    //declaring a new variable
    const declareVar = () => {
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
                declareVar();
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
                            <DropSubmit onClick={declareVar}/>
                        </Row>
                    </>
                )
            default:
                return null;
        }
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
            default:
                return null;
        }
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
                        pickVarClick,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => pickVarClick(item)}
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