import React from 'react'
import { DragSource } from 'react-dnd'

import { parseType, variableType } from '../../common/types';
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
            ...LOGIC_ITEM_VAR,
            display: parseJS(item.key),
            parseBy: parseType.variable,
            variableTypes: [variableType.number.key],
            value: item.key,
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
    parseType.variable,
    itemSource,
    COLLECT_DRAG,
)(ValueDrag);