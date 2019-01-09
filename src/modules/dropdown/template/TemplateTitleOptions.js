import React from 'react'
import { connect } from 'react-redux'

import { deleteField } from '../../fields/FieldReducer'

class TemplateTitleOptions extends React.Component{
    _onDelete = () => {
        const { fieldKey } = this.props

        this.props.deleteField(fieldKey)
        this.props.showDropdown()
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
        deleteField,
    }
)(TemplateTitleOptions)