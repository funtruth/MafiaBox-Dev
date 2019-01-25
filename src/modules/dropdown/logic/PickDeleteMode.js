import React from 'react'
import { connect } from 'react-redux'

import { deleteLogicTree } from '../../fields/FieldReducer'

import DropTitle from '../components/DropTitle';

class LogicDelete extends React.Component {
    _deleteItemByRow = () => {
        console.warn('TODO')
    }

    _deleteItemByCol = () => {
        console.warn('TODO')
    }
    
    _deleteItemAll = () => {
        console.warn('TODO')
    }

    render() {
        return (
            <div>
                <DropTitle>delete mode</DropTitle>
                <div className="drop-down-menu-option" onClick={this._deleteItemByCol}>
                    <i className="drop-down-menu-icon mdi mdi-table-column-remove"></i>
                    delete column
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteItemByRow}>
                    <i className="drop-down-menu-icon mdi mdi-table-row-remove"></i>
                    delete row
                </div>
                <div className="drop-down-menu-option" onClick={this._deleteItemAll}>
                    <i className="drop-down-menu-icon mdi mdi-table-remove"></i>
                    delete all
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        deleteLogicTree,
    }
)(LogicDelete)