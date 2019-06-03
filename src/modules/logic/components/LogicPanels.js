import React from 'react'
import { useDispatch } from 'react-redux'

import {
    dropdownType,
    logicType,
    modalType,
    operatorType,
    parseType,
} from '../../common/types'

import { showModal } from '../../modal/ModalReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'

import {
    DropClick,
    LogicButton,
    Row,
    Body,
} from '../../components/Common';

export default function LogicPanels(props) {
    const dispatch = useDispatch();
    const { logicItem, varRepo, varKey, path, index } = props
    const type = logicItem.operatorType || logicItem.logicType

    if (!varKey) {
        return null;
    }

    const varItem = varRepo[varKey] || {}
    const varPath = [...path, 'byId', varKey]

    const { display, parseBy } = varItem || {}

    const panelClick = (e) => {
        switch(type) {
            case logicType.variable.key:
            case logicType.update.key:
                dispatch(showDropdown(dropdownType.pickVar, e, {
                    ...props,
                    path: [...path, 'byId'],
                    parseBy,
                    varItem,
                }))
                break;
            case logicType.return.key:
                dispatch(showModal(modalType.editToast))
                break;
            case operatorType.forin.key:
                if (index === 0) {
                    ;
                } else if (index === 1) {
                    dispatch(showDropdown(dropdownType.pickUidObject, e))
                }
                break;
            case logicType.function.key:
            case operatorType.else.key:
            default:
                console.warn('not supported yet.')
        }
    }

    const variableClick = (e) => {
        if (index === 0) {
            dispatch(showDropdown(dropdownType.pickVar, e, {
                ...props,
                path: varPath,
                parseBy: parseType.variable,
            }))
        } else if (index === 1) {
            dispatch(showDropdown(dropdownType.pickVarWithType, e, {
                ...props,
                path: varPath,
            }))
        }
    }

    switch(parseBy) {
        case parseType.operation:
            return (
                <Row>
                    <LogicPanels {...props} index={0} varKey={varItem.value.left}/>
                    <DropClick
                        dropdown={dropdownType.pickComparison}
                        params={{
                            path: varPath,
                            baseVar: varRepo[varItem.value.left],
                        }}
                    >
                        <LogicButton>
                            {varItem.display || 'operator'}
                        </LogicButton>
                    </DropClick>
                    <LogicPanels
                        {...props}
                        index={1}
                        varKey={varItem.value.right}
                        baseVar={varRepo[varItem.value.left]}
                    />
                </Row>
            )
        case parseType.wrapper:
            return <LogicPanels {...props} varKey={varItem.value.middle}/>
        case parseType.collection:
            return (
                <Body x="l">
                    <LogicButton onClick={panelClick}>
                        add new
                    </LogicButton>
                    {varItem.value && varItem.value.map(vK => (
                        <LogicPanels key={vK} {...props} varKey={vK}/>
                    ))}
                </Body>
            )
        case parseType.variable:
        default:
            return (
                <LogicButton color={display ? 'white' : 'grey'} onClick={variableClick}>
                    {display || 'variable'}
                </LogicButton>
            )
    }
}