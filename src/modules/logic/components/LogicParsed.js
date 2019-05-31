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
import { updateGeneral } from '../../page/PageReducer'

import {
    DropClick,
    LogicButton,
    Row,
} from '../../components/Common';
import { modalType } from '../../modal/types';
import generatePushID from '../../common/generatePushID';
import { LOGIC_ITEM_VAR } from '../defaults';

function getModal(type) {
    switch(type) {
        case logicType.event.key:
            return modalType.editEvent;
        default:
            return ''
    }
}

export default function LogicParsed(props) {
    const dispatch = useDispatch();
    const { varRepo, varKey, path, dropdown } = props
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

        dispatch(showModal(getModal(logicType), {
            path: [...path, 'byId', newKey]
        }))
    }

    switch(parseBy) {
        case parseType.variable:
            return (
                <DropClick dropdown={dropdown}>
                    <LogicButton>
                        Untitled
                    </LogicButton>
                </DropClick>
            )
        case parseType.operation:
            return (
                <Row>
                    <LogicParsed
                        varKey={varItem.value.left}
                        varRepo={varRepo}
                    />
                    <LogicParsed
                        varRepo={varRepo}
                    />
                    <LogicParsed
                        varKey={varItem.value.right}
                        varRepo={varRepo}
                    />
                </Row>
            )
        case parseType.wrapper:
            return (
                <LogicParsed
                    varKey={varItem.value.middle}
                    varRepo={varRepo}
                />
            )
        case parseType.collection:
            return (
                <LogicParsed
                    varKey={varItem.value.middle}
                    varRepo={varRepo}
                />
            )
        default:
            return (
                <DropClick dropdown={dropdownType.pickLogic}>
                    <LogicButton>
                        Untitled
                    </LogicButton>
                </DropClick>
            )
    }
}