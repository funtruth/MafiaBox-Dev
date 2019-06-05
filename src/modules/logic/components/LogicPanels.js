import React from 'react'
import { useDispatch } from 'react-redux'

import {
    comparisonType,
    dropdownType,
    modalType,
    parseType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../../common/defaults';

import { VARTYPE_IS_STR } from '../../common/arrows';
import generateIDs from '../../common/generateIDs';
import { parseJS } from '../proptool';
import { showDropdown } from '../../dropdown/DropdownReducer'
import { updateGeneral } from '../../page/PageReducer'

import {
    Body,
    DropClick,
    LogicButton,
    Row,
} from '../../components/Common';

export default function LogicPanels(props) {
    const dispatch = useDispatch();
    const { varRepo, varKey, baseVar, path, rootPath, index, scopedVars, logicItem } = props

    if (!varKey) {
        return null;
    }

    const varItem = varRepo[varKey] || {}

    const repoPath = [...path, 'byId']
    const varPath = [...path, 'byId', varKey]

    const { display, parseBy, value, variableTypes, disabled } = varItem || {}

    const pickVarClick = (item) => {
        let i;
        switch(parseBy) {
            case parseType.object:
                i = generateIDs(3);

                dispatch(updateGeneral({
                    path: [...varPath, 'value'],
                    update: [...(typeof value === 'object' ? value : []), i[0]],
                }, {
                    path: repoPath,
                    update: {
                        [i[0]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[0],
                            display: ':',
                            disabled: true,
                            parseBy: parseType.operation,
                            value: {
                                left: i[1],
                                right: i[2],
                                operator: ':',
                            }
                        },
                        [i[1]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[1],
                            display: parseJS(item.key),
                            value: item.key,
                            parseBy: parseType.variable, //can be update, WIP
                            variableTypes: item.variableTypes,
                        },
                        [i[2]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[2],
                            parseBy: parseType.variable,
                        },
                    }
                }))
                break;
            case parseType.collection:
                i = generateIDs(3);

                dispatch(updateGeneral({
                    path: [...varPath, 'value'],
                    update: [...(typeof value === 'object' ? value : []), i[0]],
                }, {
                    path: repoPath,
                    update: {
                        [i[0]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[0],
                            display: comparisonType.assign.code,
                            disabled: true,
                            parseBy: parseType.operation,
                            value: {
                                operator: comparisonType.assign.key,
                                left: i[1],
                                right: i[2],
                            },
                        },
                        [i[1]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[1],
                            display: parseJS(item.key),
                            value: item.key,
                            parseBy: parseType.variable, //can be update, WIP
                            variableTypes: item.variableTypes,
                        },
                        [i[2]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[2],
                            parseBy: parseType.variable,
                        },
                    }
                }))
                break;
            case parseType.variable:
            default:
                dispatch(updateGeneral({
                    path: varPath,
                    update: {
                        ...LOGIC_ITEM_VAR,
                        display: parseJS(item.key),
                        value: item.key,
                        parseBy: parseType.variable,
                        variableTypes: item.variableTypes,
                    }
                }))
                break;
        }
        dispatch(showDropdown());
    }

    let dropdown, modal;
    switch(parseBy) {
        case parseType.operation:
            return (
                <Row y="t">
                    <LogicPanels {...props} index={0} varKey={value.left}/>
                    <DropClick
                        dropdown={dropdownType.pickComparison}
                        disabled={disabled}
                        params={{
                            path: varPath,
                            baseVar: varRepo[value.left],
                        }}
                    >
                        <LogicButton>
                            {display || '...'}
                        </LogicButton>
                    </DropClick>
                    <LogicPanels
                        {...props}
                        index={1}
                        varKey={value.right}
                        baseVar={varRepo[value.left]}
                    />
                </Row>
            )
        case parseType.wrapper:
            return <LogicPanels {...props} varKey={value.middle}/>
        case parseType.collection:
        case parseType.object:
            dropdown = variableTypes ? dropdownType.pickVarWithType : dropdownType.pickVar;
            return (
                <Body x="l">
                    {display &&
                        <DropClick
                            dropdown={dropdown}
                            params={{
                                ...props,
                                path: repoPath,
                                baseVar: varItem,
                                pickVarClick,
                            }}
                        >
                            <LogicButton>
                                add new
                            </LogicButton>
                        </DropClick>
                    }
                    {value && value.map(vK => (
                        <LogicPanels
                            key={vK}
                            {...props}
                            varKey={vK}
                        />
                    ))}
                </Body>
            )
        case parseType.number:
        case parseType.string:
        case parseType.variable:
        default:
            if (VARTYPE_IS_STR(baseVar)) modal = modalType.editString
            else if (index === 0) dropdown = dropdownType.pickVar
            else if (index === 1) dropdown = dropdownType.pickVarWithType

            return (
                <DropClick
                    disabled={disabled}
                    dropdown={dropdown}
                    context={dropdownType.replaceWildcard}
                    modal={modal}
                    params={{
                        path: varPath,
                        rootPath,
                        pickVarClick,
                        scopedVars,
                        baseVar,
                        logicItem,
                    }}
                >
                    <LogicButton
                        text={display}
                        placeholder="select ..."
                    />
                </DropClick>
            )
    }
}