import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { deleteItem, deleteLogicTree } from '../../fields/FieldReducer'

class LogicDelete extends React.Component {
    _deleteItem = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }
    
    _deleteTree = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.deleteLogicTree(indexKey, pageKey, fieldKey)
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
                <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className={`drop-down-menu-icon ion-md-close`}></i>
                    Delete Item
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteTree}>
                    <i className={`drop-down-menu-icon ion-md-warning`}></i>
                    Delete All
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        showDropdownByKey,
        deleteItem,
        deleteLogicTree,
    }
)(LogicDelete)