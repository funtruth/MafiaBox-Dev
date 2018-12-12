import React from 'react'
import { connect } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { addTag } from '../FieldReducer'
import { dropdownType } from '../../dropdown/types';

const ADD_NEW_TAG = 'add-new-tag'

class TagsView extends React.Component{
    _renderItem = (item, index) => {
        const { tagRepo, fieldInfo } = this.props
        const tagInfo = tagRepo[item]

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: tagInfo && tagInfo.title ? '#fff' : '#969696',
            marginBottom: 6,
        }

        return (
            <Draggable key={item} draggableId={item} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            ...style
                        }}

                        className="property-button menu-onclick"
                        menu-type={dropdownType.editTag}
                        index-key={index}
                        tag-key={item}
                        field-key={fieldInfo.fieldKey}
                    >
                        {(tagInfo && tagInfo.title) || 'Untitled'}
                    </div>
                )}
            </Draggable>
            
        )
    }

    _renderFooter() {
        const { fieldInfo, add } = this.props

        const style = {
            backgroundColor: 'hsla(0,0%,100%,.1)',
            color: '#969696',
            marginBottom: 6,
            maxWidth: 100,
            display: 'flex',
            justifyContent: 'center',
        }

        return (
            <div
                className="property-button menu-onclick"
                menu-type={dropdownType.createSomething}
                tag-key={ADD_NEW_TAG}
                field-key={fieldInfo.fieldKey}
                style={style}
            >
                {add || "Add"}
            </div>
        )
    }

    render() {
        const { fieldInfo } = this.props
        const { fieldKey, data } = fieldInfo
        
        return (
            <div>
                <Droppable droppableId={`TAG/${fieldKey}`} type="TEMPLATE-TAG" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="row"
                        >
                            {(data || []).map(this._renderItem)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {this._renderFooter()}
            </div>
        )
    }
}

export default connect(
    state => ({
        tagRepo: state.field.tagRepo,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        addTag,
    }
)(TagsView)