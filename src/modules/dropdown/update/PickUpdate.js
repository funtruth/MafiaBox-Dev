import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { valueType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickUpdate extends React.Component{
    _renderItem = (item) => {
        const { dropdownParams } = this.props
        const { currentValue } = dropdownParams
        
        let selected = false
        if (typeof currentValue === 'string') selected = currentValue === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item.key)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6'
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
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

    _select = (newValue) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'valueType', newValue)
        this.props.showDropdownByKey()
    }

    render() {
        const items = _.sortBy(valueType, i => i.index)
        return (
            items.map(this._renderItem)
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(PickUpdate)