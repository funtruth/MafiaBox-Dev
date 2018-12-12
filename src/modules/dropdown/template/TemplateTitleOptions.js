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
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams
        
        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
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
    }),
    {
        showDropdownByKey,
        deleteField,
    }
)(TemplateTitleOptions)