import React from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

import {
    comparisonType,
    dropdownType,
    modalType,
    parseType,
    variableType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../../common/defaults';

import { VARTYPE_IS_STR } from '../../common/arrows';
import generateIDs from '../../common/generateIDs';
import { generateCollectionParseType } from '../codetool'
import { showDropdown } from '../../dropdown/DropdownReducer'
import { updateGeneral } from '../../page/PageReducer'

import {
    Body,
    DropClick,
    Icon,
    LogicButton,
    Row,
    Text,
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

    //receives an editted item (NOT LOGIC_ITEM_VAR, but formatted to already match LOGIC_ITEM_VAR)
    //{value, display, variableTypes}
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
                            parseBy: parseType.variable,
                            ...item,
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
                    update: [...(typeof value === 'object' ? _.filter(value) : []), i[0]],
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
                            parseBy: generateCollectionParseType(logicItem),
                            ...item,
                        },
                        [i[2]]: {
                            ...LOGIC_ITEM_VAR,
                            key: i[2],
                            parseBy: parseType.variable,
                        },
                    }
                }))
                break;
            case parseType.update:
            case parseType.variable:
            default:
                dispatch(updateGeneral({
                    path: varPath,
                    update: {
                        ...LOGIC_ITEM_VAR,
                        parseBy: parseBy || parseType.variable,
                        ...item,
                    }
                }))
                break;
        }
        dispatch(showDropdown());
    }

    const deleteFromCollection = (vK) => {
        let mapClone = _.cloneDeep(varItem.value)
        mapClone = mapClone.filter(i => i !== vK)

        if (mapClone.length === 0) mapClone = ""
        
        dispatch(updateGeneral({
            path: [...path, 'byId', vK],
            update: "",
        }, {
            path: [...path, 'byId', varKey, 'value'],
            update: mapClone
        }))
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
                        <LogicButton>{display || '...'}</LogicButton>
                    </DropClick>
                    <LogicPanels
                        {...props}
                        index={1}
                        varKey={value.right}
                        baseVar={value.typingDisabled ? varRepo[value.right] : varRepo[value.left]}
                    />
                </Row>
            )
        case parseType.function:
            return (
                <Row y="t">
                    <LogicPanels {...props} index={1} varKey={value.left} baseVar={varRepo[value.left]}/>
                    <LogicButton label="arguments"/>
                    <LogicPanels {...props} index={1} varKey={value.right} baseVar={varRepo[value.right]}/>
                </Row>
            )
        case parseType.wrapper:
            return <LogicPanels {...props} varKey={value.middle} baseVar={varRepo[value.middle]}/>
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
                    {value && value.filter(i => i).map(vK => (
                        <Row key={vK}>
                            <LogicPanels
                                {...props}
                                varKey={vK}
                            />
                            <Icon
                                icon="close"
                                onClick={() => deleteFromCollection(vK)}
                            ></Icon>
                        </Row>
                    ))}
                </Body>
            )
        case parseType.declare:
            return (
                <Row>
                    <DropClick
                        dropdown={dropdownType.declarePanelVar}
                        params={{
                            varItem,
                            varKey,
                            scope: logicItem.key,
                            path: [...rootPath, 'vars', varKey],
                            parsePath: varPath,
                        }}
                    >
                        <LogicButton
                            highlight="blue"
                            color="grey"
                        >
                            new variable
                            <Text size="s" before="xxs">
                                {display || '...'}
                            </Text>
                        </LogicButton>
                    </DropClick>
                    <DropClick
                        dropdown={dropdownType.declareVarType}
                        params={{
                            variableTypeLocked: true,
                            path: varPath,
                        }}
                    >
                        <LogicButton
                            highlight="blue" 
                            color="whitish"
                        >
                            <Text size="s" color="grey" after="xxs">
                                type
                            </Text>
                            {variableTypes.map(type => type && <Icon key={type} icon={variableType[type].icon}/>)}
                            {variableTypes.length === 0 && '...'}
                        </LogicButton>
                    </DropClick>
                </Row>
            )
        case parseType.boolean:
        case parseType.number:
        case parseType.string:
        case parseType.update:
        case parseType.variable:
        default:
            if (VARTYPE_IS_STR(baseVar)) modal = modalType.editString
            else if (index === 0) dropdown = dropdownType.pickVar
            else dropdown = dropdownType.pickVarWithType

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