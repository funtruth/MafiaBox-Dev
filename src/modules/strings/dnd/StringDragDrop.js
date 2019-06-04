import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import { COLLECT_DRAG } from '../../modal/ModalDND';

import Tag from '../../components/Tag';
import { parseType } from '../../logic/types';

const itemSource = {
    beginDrag(props) {
        return {
            dragIndex: props.index,
        }
    }
}

const itemTarget = {
    drop(props, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) return;

        const item = monitor.getItem()
        const itemType = monitor.getItemType()

        console.log({item, itemType})
        //this is outdated garbo
    },
    canDrop(props, monitor) {
        const item = monitor.getItem()
        if (item.dragIndex === props.index) return false
        return true
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}
  
function StringDragDrop(props) {
    const { item, activeKey, setActiveKey,
        connectDragSource, connectDropTarget, canDrop, isOver } = props
    const { key: stringKey, value } = item

    let handleSelect = () => {
        setActiveKey(stringKey)
        document.getElementById('event-editor-textarea').focus()
    }

    const selected = stringKey === activeKey

    return connectDragSource(connectDropTarget(
        <div>
            <Tag
                onClick={handleSelect}
                bg={selected ? 'blue' : (canDrop && isOver && 'grey') || 'charcoal'}
            >
                {value}
            </Tag>
        </div>
    ));
}

export default DragSource(
    parseType.string,
    itemSource,
    COLLECT_DRAG,
)(DropTarget(
    [parseType.string],
    itemTarget,
    collectDrop,
)(StringDragDrop));


