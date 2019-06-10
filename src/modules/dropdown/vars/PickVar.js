import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    logicType,
    operatorType,
} from '../../common/types'
import { VAR_WITH_SCOPE } from '../../common/defaults'

import { VARTYPE_IS_OBJ, getVarTypeIcon } from '../../common/arrows';
import { concatField, getSubfields, parseJS } from '../../logic/proptool';
import { checkAlpha } from '../../common/helpers';
import generatePushID from '../../common/generatePushID';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
} from '../components/Common'
import { Input } from '../../components/Common'

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

    //declaring a new variable
    const declareVar = (text) => {
        const isAlpha = checkAlpha(text)
        if (!isAlpha) {
            return
        }

        if (scopedVars[text]) {
            return
        }

        const variableName = concatField("", text)
        const varKey = generatePushID('var')

        updateGeneral({
            path: [...rootPath, 'vars'],
            update: {
                [varKey]: {
                    ...VAR_WITH_SCOPE,
                    key: varKey,
                    value: variableName,
                    display: parseJS(variableName),
                    scope: logicItem.key,
                },
            }
        })
        showDropdown();
    }

    const renderDeclare = () => {
        switch(type) {
            case logicType.variable.key:
                return (
                    <>
                        <DropTitle>declare</DropTitle>
                        <Input
                            theme="tag"
                            onSubmit={declareVar}
                            showSubmit
                            placeholder="Variable name ..."
                            type="text"
                            autofocus
                            outerprops={{
                                sizes: ['xxs', 'xs']
                            }}
                        />
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

    const handleSelect = (item) => {
        pickVarClick({
            display: parseJS(item.value),
            value: item.value,
            variableTypes: item.variableTypes,
        })
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
                        prefix: item.value,
                    }}
                    text={item.display}
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
                text={item.display}
            />
        )
    }
    
    const rssVars = getSubfields('(rss)')
    return (
        <>
            {renderDeclare()}
            <DropTitle>game values</DropTitle>
            <DropScroll>{rssVars.map(renderItem)}</DropScroll>
            {renderAllVars()}
        </>
    )
}