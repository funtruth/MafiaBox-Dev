import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateType, updateFamilyType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickHealth extends React.Component{
    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            value: item.key,
            valueType: item.valueType
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const selected = typeof currentValue === 'string' && currentValue === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6'
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {selected && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        let items = _.filter(updateType, i => i.family === updateFamilyType.health)
        items = _.sortBy(items, i => i.index)

        return (
            items.map(this._renderItem)
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(PickHealth)