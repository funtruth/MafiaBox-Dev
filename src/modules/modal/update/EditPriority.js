import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import ModalOptions from '../components/ModalOptions'
import { droppableType } from '../../common/types';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    cursor: 'pointer',
    marginRight: 10,
    whiteSpace: 'nowrap',
});

const getListStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    padding: '12px 12px',
    minWidth: '90%',
});

const getEmptyListStyle = isDraggingOver => ({
    display: 'flex',
    flexDirection: 'row',
    padding: isDraggingOver ? '0px 12px' : '12px 12px',
    minWidth: '90%',
    maxHeight: 24,
    backgroundColor: isDraggingOver && 'red',
});

class EditPriority extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        const { attach } = this.props

        return (
            <div
                cancel-appclick="true"
                style={{
                    minWidth: 600,
                    width: '75vw',
                }}
            >
                <div style={{ overflowX: 'auto' }}>
                    {attach.map((list, index) => {
                        return (
                            <div key={index}>
                                <div className="priority-row">
                                    <div className="priority-gutter">
                                        {index}
                                    </div>
                                    <Droppable
                                        droppableId={`${droppableType.priority}.${index}`}
                                        direction="horizontal"
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {list.map((item, index) => (
                                                    <Draggable
                                                        key={item.pageKey}
                                                        draggableId={item.pageKey}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                className="story-tag"
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
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                                <div className="priority-row-placeholder">
                                    <div className="priority-gutter"/>
                                    <Droppable
                                        droppableId={`${droppableType.priorityNew}.${index}`}
                                        direction="horizontal"
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    style={getEmptyListStyle(snapshot.isDraggingOver)}
                                                >
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <ModalOptions
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default EditPriority