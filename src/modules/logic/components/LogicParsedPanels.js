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

import LogicParsedPanel from './LogicParsedPanel';
import {
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

export default function LogicParsedPanels(props) {
    const dispatch = useDispatch();

    const { logicItem, path } = props
    const { logicType, source, byId, byIndex } = logicItem
    console.log({props})

    if (!logicType) {
        return (
            <LogicParsedPanel
                {...props}
                placeholder="select logic ..."
                dropdown={dropdownType.pickLogic}
            />
        )
    }

    const parsedItem = byId[source]
    const { parseBy } = parsedItem

    //add a new item to a collection
    const addItem = () => {
        const newKey = generatePushID('event')

        dispatch(updateGeneral({
            path: [...path, 'byId', source],
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
        case parseType.collection:
            return (
                <LogicParsedPanel
                    {...props}
                    placeholder="select logic ..."
                    onClick={addItem}
                />
            )
        default:
            return null;
    }
}