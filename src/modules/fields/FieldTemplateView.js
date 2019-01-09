import React from 'react'
import './field.css'
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { fieldType } from './defaults'
import { dropdownType } from '../dropdown/types';

import { updateField } from './FieldReducer'

import TagsView from './templates/TagsView';
import TemplateTitle from './templates/TemplateTitle';

class FieldTemplateView extends React.Component {
    _renderItem = (item) => {
        const { updateField } = this.props
        
        const props = {
            key: item.key,
            fieldInfo: item,
            updateField,
        }
        
        switch(item.fieldType) {
            case fieldType.tag.key:
                return <TagsView {...props} add="Add Tag"/>
            case fieldType.property.key:
                return <TagsView {...props} add="Add Property"/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo, boardType, updateField } = this.props
            
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Droppable droppableId={`TEMPLATE-${boardType}`} type="TEMPLATE">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                        >
                            {pageInfo.map((item, index) => (
                                <Draggable key={item.key} draggableId={item.key} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div highlight="true" style={{ padding: '2px 6px', borderRadius: 2 }}>
                                                <TemplateTitle
                                                    boardType={boardType}
                                                    fieldInfo={item}
                                                    updateField={updateField}
                                                />
                                                {this._renderItem(item)}
                                            </div>
                                            <div className="page-separator"/>
                                        </div>
                                    )}
                                        
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div
                    className="add-button menu-onclick"
                    menu-type={dropdownType.addTemplateField}
                    field-key={boardType}
                >
                    Add Field
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updateField,
    }
)(FieldTemplateView)