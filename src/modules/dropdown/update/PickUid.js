import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { variableType, updateType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'
import { addItemBelowOf, deleteItem } from '../../fields/FieldReducer'

class PickUid extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const selected = typeof currentValue === 'string' && currentValue === item

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
                        pointerEvents: 'none',
                    }}
                />}
            </div>
        )
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.${item.key}`, {
            expand: true,
            updateType: updateType.uid,
        })
        this.props.showDropdownByKey()
    }

    _onClear = () => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            expand: false,
            value: null,
            updateType: updateType.uid,
        })
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownData } = this.props
        const uids = _.filter(dropdownData, i => i.variableType === variableType.uid.key)
        
        return (
            uids.length ?
                <div>
                    {uids.map(this._renderItem)}
                    <div className="drop-down-menu-separator"/>
                    <div className="drop-down-menu-option" onClick={this._onClear}>
                        <i className={`drop-down-menu-icon mdi mdi-null`}></i>
                        Null
                    </div>
                </div>
                :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                    There are no Unique IDs
                </div>
        )
    }
}

export default connect(
    state => ({
        dropdownData: state.dropdown.dropdownData,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
        addItemBelowOf,
        deleteItem,
    }
)(PickUid)