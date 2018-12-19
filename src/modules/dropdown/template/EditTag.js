import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updateTag, deleteTag } from '../../fields/FieldReducer'

class EditTag extends React.Component{
    _onDelete = () => {
        const { indexKey, fieldKey } = this.props

        this.props.deleteTag(fieldKey, indexKey)
        this.props.showDropdownByKey()
    }

    _onChange = e => {
        const { tagKey } = this.props
        this.props.updateTag(tagKey, 'title', e.target.value)
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this.props.showDropdownByKey()
                break
            default:
        }
    }

    render() {
        const { tagKey, tagRepo } = this.props

        if (!tagKey) return null
        const fieldInfo = tagRepo[tagKey]
        if (!fieldInfo) return null

        return (
            <div>
                <input
                    className="tag-input menu-voidclick"
                    value={fieldInfo.title || ''}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
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
        tagRepo: state.field.tagRepo,
    }),
    {
        showDropdownByKey,
        updateTag,
        deleteTag,
    }
)(EditTag)