import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'

class EditTag extends React.Component{
    _onDelete = () => {

    }

    _onChange = e => {
        
    }

    render() {
        const { dropdownParams, fieldRepo } = this.props
        const { fieldKey, indexKey, pageX, pageY } = dropdownParams
        console.log(dropdownParams)

        const fieldInfo = fieldRepo[fieldKey].data[indexKey]

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        if (!fieldInfo) return null
        return (
            <div className="drop-down-menu" style={menuStyle}>
                <input
                    className="page-input menu-voidclick"
                    value={fieldInfo.title || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
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
        boardOrder: state.board.boardOrder,
        boardRepo: state.board.boardRepo,
        storyMap: state.page.storyMap,

        fieldRepo: state.field.fieldRepo,
    }),
    {
        showDropdownByKey,
        popHighestDropdown,
    }
)(EditTag)