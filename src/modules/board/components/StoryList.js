import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { modalType } from '../../modal/types'
import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'
import { addPageToMap } from '../../page/PageReducer'
import { droppableType } from '../../common/types';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    cursor: 'pointer',
    marginBottom: 8,
});

const getListStyle = isDraggingOver => ({
    
});


class StoryList extends React.Component{
    _onAdd = (itemCount) => {
        const { item, boardType } = this.props
        this.props.addPageToMap(item.key, itemCount, boardType)
    }

    _onClick = (item, snapshot) => {
        if (!snapshot.isDragging){
            this.props.showModal(
                modalType.showPage,
                {
                    pageKey: item.pageKey,
                    boardType: item.boardType,
                },
            )
        }
    }

    render() {  
        const { item, index, repo } = this.props

        const filteredPageRepo = _.filter(repo, i => i.storyType === item.key)
        
        const itemCount = filteredPageRepo.length
        const isEmpty = filteredPageRepo.length === 0

        return (
            <div>
                <div className="story-title">
                    <div className={`${item.palette || "black-grey"} story-label`}>
                        {item.title}
                    </div>
                    <div
                        className="story-option app-onclick"
                        menu-type={dropdownType.storyShowMore}
                        app-onclick-props={JSON.stringify({
                            fieldKey: index,
                        })}
                    >
                        <i
                            className="ion-ios-more"
                            style={{
                                fontSize: 16,
                            }}
                        ></i>
                    </div>
                    <div
                        className="story-option"
                        onClick={this._onAdd.bind(this, itemCount)}
                    >
                        <i
                            className="ion-ios-add"
                            style={{
                                fontSize: 19,
                            }}
                        ></i>
                    </div>
                    
                </div>
                <Droppable droppableId={`${droppableType.page}.${item.key}`} type="ITEM">
                    {(provided, snapshot) => (
                        <div
                            className="story-list"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {isEmpty?<div className="story-empty">There is nothing here yet</div>
                                :filteredPageRepo.map((item, index) => (
                                    <Draggable key={item.pageKey} draggableId={item.pageKey} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="story-tag"
                                                onClick={this._onClick.bind(this, item, snapshot)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                {item.title || 'Untitled'}
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
                
        )
    }
}

export default connect(
    null,
    {
        showModal,
        addPageToMap,
    }
)(StoryList)