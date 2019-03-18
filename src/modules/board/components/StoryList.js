import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { modalType } from '../../modal/types'
import { dropdownType } from '../../dropdown/types'
import { droppableType, updateSourceType } from '../../common/types';

import { showModal } from '../../modal/ModalReducer'
import { addPageToMap } from '../../page/PageReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    cursor: 'pointer',
    marginBottom: 8,
});

function StoryList(props) {
    const {
        column,     //storyMap[boardType].byId[storyMapId]
        repo,       //pageRepo[storyMapId]
        boardType,
    } = props
    const { byId, byIndex } = repo
    
    const handleAdd = () => {
        props.addPageToMap(column.key, boardType)
    }

    const handleClick = (item, snapshot) => {
        if (!snapshot.isDragging){
            props.showModal(
                modalType.showPage,
                {
                    pageKey: item.pageKey,
                    path: [column.key, 'byId', item.pageKey],
                    updateSource: updateSourceType.repo,
                    boardType: item.boardType,
                },
            )
        }
    }

    return (
        <div>
            <div className="story-title">
                <div className={`${column.palette || "black-grey"} story-label`}>
                    {column.title}
                </div>
                <div
                    className="story-option app-onclick"
                    menu-type={dropdownType.storyShowMore}
                    app-onclick-props={JSON.stringify({
                        boardType,
                        mapKey: column.key,
                    })}
                >
                    <i
                        className="ion-ios-more"
                        style={{
                            fontSize: 16,
                        }}
                    ></i>
                </div>
                <div className="story-option" onClick={handleAdd}>
                    <i
                        className="ion-ios-add"
                        style={{
                            fontSize: 19,
                        }}
                    ></i>
                </div>
            </div>
            <Droppable droppableId={`${droppableType.page}.${column.key}`} type="ITEM">
                {(provided, snapshot) => (
                    <div
                        className="story-list"
                        ref={provided.innerRef}
                    >
                        {byIndex.length?
                            byIndex.map((id, index) => {
                                const item = byId[id] || {}
                                
                                return (
                                    <Draggable key={item.pageKey} draggableId={item.pageKey} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="story-tag"
                                                onClick={() => handleClick(item, snapshot)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                {(typeof item.title === 'string' && item.title) || 'Untitled'}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })
                            :<div className="story-empty">There is nothing here yet</div>
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
        addPageToMap,
    }
)(StoryList)