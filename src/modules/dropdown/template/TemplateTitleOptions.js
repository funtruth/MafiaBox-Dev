import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../../dropdown/DropdownReducer'
import { deleteField } from '../../fields/FieldReducer'

class TemplateTitleOptions extends React.Component{
    _onDelete = () => {
        const { dropdownParams } = this.props
        const { fieldKey, pageKey } = dropdownParams

        this.props.deleteField(pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    render() {
        return (
            <div>
                <div className="drop-down-menu-option" onClick={this._onDelete}>
                    <i className={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showDropdownByKey,
        deleteField,
    }
)(TemplateTitleOptions)