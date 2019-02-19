import React from 'react'
import { connect } from 'react-redux'

import { updateField, deleteTag } from '../../fields/FieldReducer'

class EditTag extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    _onDelete = () => {
        const { tagKey, fieldKey } = this.props

        this.props.deleteTag(fieldKey, tagKey)
        this.props.showDropdown()
    }

    _onChange = e => {
        const { tagKey, fieldKey } = this.props
        this.props.updateField(
            [fieldKey, 'data', tagKey],
            {title: e.target.value}
        )
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this.props.showDropdown()
                break
            default:
        }
    }

    render() {
        const { tagKey, fieldRepo, fieldKey } = this.props

        if (!tagKey) return null
        const fieldInfo = fieldRepo[fieldKey].data[tagKey]
        if (!fieldInfo) return null

        return (
            <div>
                <input
                    className="tag-input"
                    value={fieldInfo.title || ''}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="-sep"/>
                <div className="drop-down-menu-option" onClick={this._onDelete}>
                    <i className={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
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
        deleteTag,
    }
)(EditTag)