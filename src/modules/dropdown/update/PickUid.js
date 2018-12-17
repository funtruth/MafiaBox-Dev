import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

import Dropdown from '../components/Dropdown'

class PickUid extends React.Component{
    _renderItem = (item) => {
        const { dropdownParams } = this.props
        const { currentValue } = dropdownParams
        
        let selected = false
        if (typeof currentValue === 'string') selected = currentValue === item

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                }}
            >
                {item.key}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{
                        marginLeft: 'auto',
                        width: 30,
                        textAlign: 'center',
                    }}
                />}
            </div>
        )
    }

    _select = (item) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {expand: true, value: item.key})
        this.props.showDropdownByKey()
    }

    _addItemBelow = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.addItemBelowOf(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    _deleteItem = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.deleteItem(indexKey, pageKey, fieldKey)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownData } = this.props
        const uids = _.filter(dropdownData, i => i.variableType === variableType.uid.key)
        
        return (
            <Dropdown>
                {uids.map(this._renderItem)}
            </Dropdown>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        dropdownData: state.dropdown.dropdownData,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
        addItemBelowOf,
        deleteItem,
    }
)(PickUid)