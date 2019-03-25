import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'

import { dropdownType } from '../../../dropdown/types'

import { addPageToMap, updateStory } from '../../../page/PageReducer'

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
  
    // styles we need to apply on draggables
    ...draggableStyle,
});

function PatchItem(props) {
    const { patchInfo, index } = props
    const { key: storyKey, boardType } = patchInfo

    let [title, setTitle] = useState(patchInfo.title || '')
    let [showInput, setShowInput] = useState(false)

    const handleText = (e) => setTitle(e.target.value)
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {    
            e.target.blur() 
        }
    }
    const handleTitleClick = () => setShowInput(true)
    const handleTextBlur = () => {
        props.updateStory(storyKey, {
            title,
        })
        setShowInput(false)
    }
    
    const handleAdd = () => {
        props.addPageToMap(storyKey, boardType)
    }

    return (
        <Draggable draggableId={storyKey} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className="patch-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <div className="patch-item-header">
                        {showInput ?
                            <input
                                className="patch-item-input"
                                value={title}
                                onChange={handleText}
                                autoFocus={true}
                                onBlur={handleTextBlur}
                                onKeyPress={handleKeyPress}
                            />
                            :<div className="patch-item-title" onClick={handleTitleClick}>
                                {title || 'Untitled'}
                            </div>
                        }
                        <div className="patch-item-option" onClick={handleAdd}>
                            <i className="mdi mdi-plus"></i>
                        </div>
                        <div
                            className="patch-item-option app-onclick"
                            menu-type={dropdownType.storyShowMore}
                            app-onclick-props={JSON.stringify({
                                boardType,
                                mapKey: storyKey,
                            })}
                        >
                            <i className="mdi mdi-dots-horizontal"></i>
                        </div>
                    </div>
                    <div className="patch-collapse">
                        {props.children}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default connect(
    null,
    {
        addPageToMap,
        updateStory,
    }
)(PatchItem)