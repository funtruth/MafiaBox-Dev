import React from 'react'
import _ from 'lodash'
import { DragSource } from 'react-dnd'

import { ItemTypes } from './EventConstants'
import { COLLECT_DRAG } from '../../ModalDND';

const itemSource = {
    beginDrag(props) {
        return {
            hexcode: props.item,
        }
    }
}
  
function EventColorDrag(props) {
    const { workspace, setWorkspace, eventIndex, stringIndex, item, connectDragSource } = props
    const { selectedColor } = workspace

    const selected = item === selectedColor

    let handleSelect = (color) => {
        if (stringIndex === '') {
            setWorkspace({
                ...workspace,
                selectedColor: color,
            })
        } else {
            let wsClone = _.cloneDeep(workspace)
            wsClone.eventArr[eventIndex].stringArr[stringIndex].color = color
            wsClone.selectedColor = color
            setWorkspace(wsClone)
        }
    }

    return connectDragSource(
        <div
            className="event-color-drag"
            onClick={() => handleSelect(item)}
            style={{
                backgroundColor: item,
                border: selected && '2px solid #ddd',
            }}
        >
            {selected && <i className="mdi mdi-spellcheck outlined-text"></i>}
        </div>
    );
}

export default DragSource(
    ItemTypes.EVENT_COLOR,
    itemSource,
    COLLECT_DRAG,
)(EventColorDrag);