import React from 'react'
import { useDispatch } from 'react-redux'

import {
    dropdownType,
    comparisonType,
    modalType,
    parseType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../../common/defaults';

import { VARTYPE_IS_STR } from '../../common/arrows';
import generateIDs from '../../common/generateIDs';
import { parseJS } from '../proptool';
import { showModal } from '../../modal/ModalReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'
import { updateGeneral } from '../../page/PageReducer'

import {
    Body,
    DropClick,
    LogicButton,
    Row,
    Text,
} from '../../components/Common';

export default function LogicPanels(props) {
    const dispatch = useDispatch();
    const { varRepo, varKey, baseVar, path, index } = props

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
                i = generateIDs(3)

                dispatch(updateGeneral({
                    path: [...varPath, 'value'],
                    update: [...(value || []), i[0]],
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
                            nativeValue: item.key,
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
                i = generateIDs(3)

                dispatch(updateGeneral({
                    path: [...varPath, 'value'],
                    update: [...(value || []), i[0]],
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
                            nativeValue: item.key,
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
                        nativeValue: item.key,
                        parseBy: parseType.variable,
                        variableTypes: item.variableTypes,
                    }
                }))
                break;
        }
        dispatch(showDropdown());
    }

    const panelClick = (e) => {
        if (variableTypes) {
            dispatch(showDropdown(dropdownType.pickVarWithType, e, {
                ...props,
                path: repoPath,
                varItem,
                variableTypes,
                pickVarClick,
            }))
        } else {
            dispatch(showDropdown(dropdownType.pickVar, e, {
                ...props,
                path: repoPath,
                varItem,
                pickVarClick,
            }))
        }
    }

    const variableClick = (e) => {
        if (VARTYPE_IS_STR(varItem)) {
            dispatch(showModal(modalType.editString, {
                path: varPath,
            }))
        } else if (index === 0) {
            dispatch(showDropdown(dropdownType.pickVar, e, {
                ...props,
                path: varPath,
                pickVarClick,
            }))
        } else if (index === 1) {
            dispatch(showDropdown(dropdownType.pickVarWithType, e, {
                ...props,
                path: varPath,
                variableTypes: baseVar && baseVar.variableTypes,
                pickVarClick,
            }))
        }
    }

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
            return (
                <Body x="l">
                    {display &&
                        <LogicButton onClick={panelClick}>
                            add new
                        </LogicButton>
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
            return (
                <LogicButton disabled={disabled} onClick={variableClick}>
                    <Text size="s" color={display ? 'white' : 'grey'}>
                        {display || 'select ...'}
                    </Text>
                </LogicButton>
            )
    }
}