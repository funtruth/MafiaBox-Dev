import React from 'react'
import { DragSource } from 'react-dnd'

import { mathType, variableType } from '../../common/types';
import { LOGIC_ITEM_VAR } from '../../logic/defaults';

import { COLLECT_DRAG } from '../../common/arrows';

import {
    Tag,
} from '../../components/Common';
import { parseJS } from '../../logic/proptool';

const itemSource = {
    beginDrag(props) {
        const { item } = props

        return {
            math: mathType.value,
            value: {
                ...LOGIC_ITEM_VAR,
                display: parseJS(item.key),
                nativeValue: item.key,
                value: item.key,
                variableTypes: [variableType.number.key],
            },
        }
    }
}

function ValueDrag(props) {
    const { item, connectDragSource } = props

    return connectDragSource(
        <div><Tag>{item.key}</Tag></div>
    );
}

export default DragSource(
    mathType.value,
    itemSource,
    COLLECT_DRAG,
)(ValueDrag);