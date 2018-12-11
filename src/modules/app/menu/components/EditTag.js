import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updateTag, deleteTag } from '../../../fields/FieldReducer'

class EditTag extends React.Component{
    _onDelete = () => {
        const { dropdownParams } = this.props
        const { indexKey, fieldKey } = dropdownParams

        this.props.deleteTag(fieldKey, indexKey)
        this.props.showDropdownByKey()
    }

    _onChange = e => {
        const { tagKey } = this.props.dropdownParams
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
        const { dropdownParams, tagRepo } = this.props
        const { tagKey, pageX, pageY } = dropdownParams

        if (!tagKey) return null
        const fieldInfo = tagRepo[tagKey]
        if (!fieldInfo) return null

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
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
                    <i className={`drop-down-menu-icon ion-md-return-left`}></i>
                    Move to
                </div>
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
        dropdownParams: state.dropdown.dropdownParams,
        fieldRepo: state.field.fieldRepo,
        tagRepo: state.field.tagRepo,
    }),
    {
        showDropdownByKey,
        updateTag,
        deleteTag,
    }
)(EditTag)