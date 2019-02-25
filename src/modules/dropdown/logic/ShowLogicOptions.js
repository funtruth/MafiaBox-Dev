import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../types'

import { addItem, deleteItem } from '../../fields/FieldReducer'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';

function ShowLogicOptions(props) {
    const { attach } = props

    let handleAdd = (dir) => {
        const { pageKey, fieldKey, indexKey } = props
        props.addItem(pageKey, fieldKey, indexKey, dir)
        props.showDropdown()
    }

    let handleDelete = () => {
        const { pageKey, fieldKey, indexKey } = props
        props.deleteItem(pageKey, fieldKey, indexKey)
        props.showDropdown()
    }


    return (
        <div>
            <DropTitle>options</DropTitle>
            <div className="drop-down-menu-option" onClick={() => handleAdd('right')}>
                <i className="drop-down-menu-icon mdi mdi-chevron-double-right"></i>
                add right
            </div>
            <div className="drop-down-menu-option" onClick={() => handleAdd('down')}>
                <i className="drop-down-menu-icon mdi mdi-chevron-double-down"></i>
                add below
            </div>
            {attach.source && <div className="drop-down-menu-option" onClick={handleDelete}>
                <i className="drop-down-menu-icon mdi mdi-close"></i>
                delete
            </div>}
            {attach.source && <DropParent
                {...props}
                dropdownType={dropdownType.pickDeleteMode}
                icon="mdi mdi-close-network"
                text="delete ..."
            />}
        </div>
    )
}

export default connect(
    null,
    {
        addItem,
        deleteItem,
    }
)(ShowLogicOptions)