import React, { useEffect } from 'react'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './PriorityConstants'
import { COLLECT_DRAG } from '../../ModalDND';
import {
    Text,
 } from '../../../components/Common';

const itemSource = {
    beginDrag(props) {
        const { xIndex, yIndex } = props
        return {
            itemXIndex: xIndex,
            itemYIndex: yIndex,
        }
    }
}

function PriorityRoleDrag(props) {
    const { item, switched, pageKey, storyKey, connectDragSource } = props

    const itemStyle = {
        color: pageKey === item.pageKey ? '#fff' : '#d6d6d6',
    }

    useEffect(() => {
        console.log('item mounting, add fadeIn', item)
    }, [])

    if (!switched && item.storyType !== storyKey) return null

    return connectDragSource(
        <div className="priority-role-drag" style={itemStyle}>
            <Text size="s" color="lightgrey">
                {item.title || 'Untitled'}
            </Text>
        </div>
    );
}

export default DragSource(
    ItemTypes.ROLE,
    itemSource,
    COLLECT_DRAG,
)(PriorityRoleDrag);