import React from 'react'
import { DragSource } from 'react-dnd'

import { mathType, variableType } from '../../common/types';
import { VAR_DEFAULTS } from '../../logic/defaults';

import { COLLECT_DRAG } from '../../common/arrows';

import {
    Tag,
} from '../../components/Common';
import { parseJS } from '../../logic/proptool';

const itemSource = {
    beginDrag(props) {
        const { item, isWild } = props

        return {
            math: mathType.value,
            value: {
                ...VAR_DEFAULTS,
                display: parseJS(item.key),
                value: item.key,
                variableTypes: [variableType.number.key],
                wildcardValue: isWild ? item.key : "",
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