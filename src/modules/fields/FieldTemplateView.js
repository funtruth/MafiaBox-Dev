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
    _renderItem = (fieldKey) => {
        const { fieldRepo, updateField } = this.props
        const fieldInfo = fieldRepo[fieldKey]
        
        const props = {
            key: fieldKey,
            fieldInfo,
            updateField,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.tag:
                return <TagsView {...props} add="Add Tag"/>
            case fieldType.property:
                return <TagsView {...props} add="Add Property"/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo, fieldMapKey,
            fieldRepo, updateField } = this.props
            
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Droppable droppableId={`TEMPLATE-${fieldMapKey}`} type="TEMPLATE">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                        >
                            {pageInfo.map((item, index) => (
                                <Draggable key={item} draggableId={item} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="highlight" style={{ padding: '2px 6px', borderRadius: 2 }}>
                                                <TemplateTitle
                                                    fieldMapKey={fieldMapKey}
                                                    fieldInfo={fieldRepo[item]}
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
                    field-key={fieldMapKey}
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