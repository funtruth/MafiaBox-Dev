import React from 'react'
import { useDispatch } from 'react-redux'

import {
    dropdownType,
    logicType,
    modalType,
    operatorType,
    parseType,
} from '../../common/types'
import { LOGIC_ITEM_VAR } from '../defaults';

import generatePushID from '../../common/generatePushID';
import { showModal } from '../../modal/ModalReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'
import { updateGeneral } from '../../page/PageReducer'

import {
    DropClick,
    LogicButton,
    Row,
    Body,
} from '../../components/Common';

export default function LogicParsed(props) {
    const dispatch = useDispatch();
    const { type, varRepo, varKey, params, path, index } = props

    if (!varKey) {
        return null;
    }

    const varItem = varRepo[varKey] || {}
    const varPath = [...path, 'byId', varKey]

    const { display, value, parseBy } = varItem || {}
    const { byIndex } = value || {}

    //add a new item to a collection
    const addItem = () => {
        const newKey = generatePushID('event')

        dispatch(updateGeneral({
            path: varPath,
            update: {
                value: byIndex ? [...byIndex, newKey] : [newKey]
            },
        }, {
            path: [...path, 'byId', newKey],
            update: {
                ...LOGIC_ITEM_VAR,
            }
        }))

        dispatch(showModal(modalType.editEvent, {
            path: [...path, 'byId', newKey]
        }))
    }

    const panelClick = (e) => {
        switch(type) {
            case logicType.variable.key:
                dispatch(showDropdown(dropdownType.declareOrAssignVar, e))
                break;
            case logicType.update.key:
                dispatch(showDropdown(dropdownType.showSubfields, e))
                break;
            case logicType.event.key:
                addItem();
                break;
            case logicType.return.key:
                dispatch(showModal(modalType.editToast))
                break;
            case operatorType.if.key:
            case operatorType.elseif.key:
                if (index === 0) {
                    dispatch(showDropdown(dropdownType.pickVar, e, {path: varPath}))
                } else if (index === 1) {
                    dispatch(showDropdown(dropdownType.pickVarWithType, e, {
                        ...params,
                        path: varPath,
                    }))
                }
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

    switch(parseBy) {
        case parseType.operation:
            return (
                <Row>
                    <LogicParsed {...props} index={0} varKey={varItem.value.left}/>
                    <DropClick
                        dropdown={dropdownType.pickComparison}
                        params={{
                            path: [...varPath, 'value'],
                            baseVar: varRepo[varItem.value.left],
                        }}
                    >
                        <LogicButton>
                            {varItem.value.display || 'operator'}
                        </LogicButton>
                    </DropClick>
                    <LogicParsed
                        {...props}
                        index={1}
                        varKey={varItem.value.right}
                        params={{
                            baseVar: varRepo[varItem.value.left],
                        }}
                    />
                </Row>
            )
        case parseType.wrapper:
            return <LogicParsed {...props} varKey={varItem.value.middle}/>
        case parseType.collection:
            return (
                <Body>
                    <LogicButton onClick={panelClick}>
                        add new
                    </LogicButton>
                </Body>
            )
        case parseType.variable:
        default:
            return (
                <LogicButton color={display ? 'white' : 'grey'} onClick={panelClick}>
                    {display || 'variable'}
                </LogicButton>
            )
    }
}