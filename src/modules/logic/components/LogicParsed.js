import React from 'react'
import { useDispatch } from 'react-redux'

import {
    dropdownType,
    logicType,
    operatorType,
    parseType,
} from '../../common/types'

import { concatField } from '../proptool';
import { showModal } from '../../modal/ModalReducer'
import { showDropdown } from '../../dropdown/DropdownReducer'
import { updateGeneral } from '../../page/PageReducer'

import {
    DropClick,
    LogicButton,
    Row,
    Body,
} from '../../components/Common';
import { modalType } from '../../modal/types';
import generatePushID from '../../common/generatePushID';
import { LOGIC_ITEM_VAR } from '../defaults';

export default function LogicParsed(props) {
    const dispatch = useDispatch();
    const { type, varRepo, varKey, path, index } = props
    const varItem = varRepo[varKey] || {}
    const { value, parseBy } = varItem || {}
    const { byIndex } = value || {}

    if (!varKey) {
        return null;
    }

    //add a new item to a collection
    const addItem = () => {
        const newKey = generatePushID('event')

        dispatch(updateGeneral({
            path: [...path, 'byId', varKey],
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

    const dropdown = (key, e) => {
        dispatch(showDropdown(key, e, {

        }))
    }

    const panelClick = (e) => {
        switch(type) {
            case logicType.variable.key:
                dropdown(dropdownType.declareOrAssignVar, e)
                break;
            case logicType.update.key:
                dropdown(dropdownType.showSubfields, e)
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
                    dropdown(dropdownType.pickVar, e)
                } else if (index === 1) {
                    dropdown(dropdownType.pickVarWithType, e)
                }
                break;
            case operatorType.forin.key:
                if (index === 0) {
                    ;
                } else if (index === 1) {
                    dropdown(dropdownType.pickUidObject, e)
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
                    <DropClick dropdown={dropdownType.pickComparison}>
                        <LogicButton>
                            {varItem.value.display || 'operator'}
                        </LogicButton>
                    </DropClick>
                    <LogicParsed {...props} index={1} varKey={varItem.value.right}/>
                </Row>
            )
        case parseType.wrapper:
            return (
                <LogicParsed {...props} varKey={varItem.value.middle}/>
            )
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
                <LogicButton onClick={panelClick}>
                    Untitled
                </LogicButton>
            )
    }
}