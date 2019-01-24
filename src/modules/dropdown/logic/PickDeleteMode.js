import React from 'react'
import { connect } from 'react-redux'

import { deleteItem, deleteLogicTree } from '../../fields/FieldReducer'

import DropTitle from '../components/DropTitle';

class LogicDelete extends React.Component {
    _deleteItem = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdown()
    }
    
    _deleteTree = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.deleteLogicTree(indexKey, pageKey, fieldKey)
        this.props.showDropdown()
    }

    render() {
        return (
            <div>
                <DropTitle>delete mode</DropTitle>
                <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className="drop-down-menu-icon mdi mdi-table-column-remove"></i>
                    delete column
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteTree}>
                    <i className="drop-down-menu-icon mdi mdi-table-row-remove"></i>
                    delete row
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteTree}>
                    <i className="drop-down-menu-icon mdi mdi-table-remove"></i>
                    delete all
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        deleteItem,
        deleteLogicTree,
    }
)(LogicDelete)