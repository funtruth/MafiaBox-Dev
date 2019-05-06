import React, { useState } from 'react'
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
        pageRepo,
        pageMap,
        column,
        boardType,
        storyKey,
    } = props
    
    const indexPages = pageMap[storyKey] || {}

    let [title, setTitle] = useState(column.title)
    let [showInput, setShowInput] = useState(false)

    const handleText = (e) => setTitle(e.target.value)
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }
    const handleTitleClick = () => setShowInput(true)
    const handleTextBlur = () => {
        setShowInput(false)
    }
    
    const handleAdd = () => {
        props.addPageToMap(column.key, boardType)
    }

    const handleClick = (item, snapshot) => {
        if (!snapshot.isDragging){
            props.showModal(
                modalType.showPage,
                {
                    pageKey: item.pageKey,
                    path: [item.pageKey],
                    updateSource: updateSourceType.repo,
                    boardType: item.boardType,
                },
            )
        }
    }

    return (
        <div>
            <div className="story-title">
                {showInput ?
                    <input
                        className="story-input"
                        value={title}
                        onChange={handleText}
                        autoFocus={true}
                        onBlur={handleTextBlur}
                        onKeyPress={handleKeyPress}
                    />
                    :<div
                        className={`${column.palette || "black-grey"} story-label`}
                        onClick={handleTitleClick}
                    >
                        {column.title || "Untitled"}
                    </div>
                }
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
                        {indexPages.length?
                            indexPages.map((pageKey, index) => {
                                const item = pageRepo[pageKey]
                                if (!item) return null;
                                
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
    state => ({
        pageRepo: state.page.pageRepo,
        pageMap: state.page.pageMap,
    }),
    {
        showModal,
        addPageToMap,
    }
)(StoryList)