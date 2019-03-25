import React from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { modalType } from '../../../modal/types'
import { updateSourceType } from '../../../common/types'

import { showModal } from '../../../modal/ModalReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
});

function PatchListItem(props) {
    const { pageInfo, index } = props
    const { pageKey, title, boardType } = pageInfo

    const handleClick = ({isDragging}) => {
        if (!isDragging){
            props.showModal(
                modalType.showPage,
                {
                    pageKey,
                    path: [pageKey],
                    updateSource: updateSourceType.repo,
                    boardType,
                },
            )
        }
    }

    return (
        <Draggable
            draggableId={pageKey}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    className="patch-list-item"
                    onClick={() => handleClick(snapshot)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {(typeof title === 'string' && title) || 'Untitled'}
                </div>
            )}
        </Draggable>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(PatchListItem)