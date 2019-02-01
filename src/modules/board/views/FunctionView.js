import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { droppableType } from '../../common/types';
import { boardType } from '../../fields/defaults'

import { addPageToMap } from '../../page/PageReducer'

import FunctionList from '../components/FunctionList'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
    ...styles.itemStyle,
});

const getListStyle = isDraggingOver => ({
    ...styles.listStyle,
});

class FunctionView extends React.Component{
    render() {
        const { functionMap, functionRepo } = this.props

        const filteredMap = _.sortBy(functionMap, i => i.index)
        const filteredRepo = _.sortBy(functionRepo, i => i.index)
        
        return (
            <div className="story-view">
                <Droppable droppableId={droppableType.functionBoard} direction="horizontal" type="COLUMN">
                    {(provided, snapshot) => (
                        <div
                            className="scrollable-x"
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {filteredMap.map((item, index) => (
                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <FunctionList
                                                item={item}
                                                storyIndex={index}
                                                boardType={boardType}
                                                dragging={snapshot.isDragging}
                                                repo={filteredRepo}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>  
        )
    }
}

const styles = {
    itemStyle: {
        color: '#fff',
        lineHeight: 1.2,
        font: '500 14px Arial',
        cursor: 'pointer',
        pointerEvents: 'none',
        minWidth: 180,
        marginRight: 12,
    },
    listStyle: {
        display: 'flex',
        overflow: 'auto',
        minHeight: 'calc(100vh - 76px)',
    }
}

export default connect(
    state => ({
        functionRepo: state.functions.functionRepo,
        functionMap: state.functions.functionMap,
    }),
    {
        addPageToMap,
    }
)(FunctionView)