import React from 'react'
import _ from 'lodash'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { dropdownType } from '../../dropdown/types';

class TagsView extends React.Component{
    _renderItem = (item, index) => {
        const { fieldKey } = this.props

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: item.title ? '#fff' : '#969696',
            marginBottom: 6,
        }
        
        if (!fieldKey) console.warn('There is no fieldKey. TagsView 17.')

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
                        app-onclick-props={JSON.stringify({
                            fieldKey: fieldKey,
                            indexKey: index,
                            tagKey: item.key,
                        })}
                    >
                        {item.title || 'Untitled'}
                    </div>
                )}
            </Draggable>
            
        )
    }

    _renderFooter() {
        const { fieldKey, add } = this.props

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
                app-onclick-props={JSON.stringify({
                    fieldKey: fieldKey,
                })}
                style={style}
            >
                <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                {add || "Add"}
            </div>
        )
    }

    render() {
        const { fieldInfo } = this.props
        const { key, data } = fieldInfo

        const tags = _.sortBy(data, i => i.index)
        
        return (
            <div>
                <Droppable droppableId={`TAG/${key}`} type={`TEMPLATE-TAG/${key}`} direction="horizontal">
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