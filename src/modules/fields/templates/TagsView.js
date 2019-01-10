import React from 'react'
import _ from 'lodash'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { dropdownType } from '../../dropdown/types';

class TagsView extends React.Component{
    _renderItem = (item, index) => {
        const { fieldInfo } = this.props

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: item.title ? '#fff' : '#969696',
            marginBottom: 6,
        }
        
        return (
            <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            ...style
                        }}

                        className="property-button app-onclick"
                        menu-type={dropdownType.editTag}
                        index-key={index}
                        tag-key={item.key}
                        field-key={fieldInfo.fieldKey}
                    >
                        {item.title || 'Untitled'}
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
            maxWidth: 130,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }

        return (
            <div
                className="property-button app-onclick"
                menu-type={dropdownType.addTag}
                field-key={fieldInfo.fieldKey}
                style={style}
            >
                <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                {add || "Add"}
            </div>
        )
    }

    render() {
        const { fieldInfo } = this.props
        const { fieldKey, data } = fieldInfo

        const tags = _.sortBy(data, i => i.index)
        
        return (
            <div>
                <Droppable droppableId={`TAG/${fieldKey}`} type={`TEMPLATE-TAG/${fieldKey}`} direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="row"
                        >
                            {tags.map(this._renderItem)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {this._renderFooter()}
            </div>
        )
    }
}

export default TagsView