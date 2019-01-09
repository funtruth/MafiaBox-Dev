import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateType, valueType, updateFamilyType } from '../../logic/types'
import { dropdownType } from '../types'

import { popDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickUpdate extends React.Component{
    _onMouseOver = (item, e) => {
        const { hoverKey, currentValue, attach } = this.props
        if (item.key === hoverKey) return
        
        const selected = typeof currentValue === 'string' && currentValue === item.key
        
        this.props.showDropdown(dropdownType.inputValue, e, {
            hoverKey: item.key,
            inputText: 'Enter a number',
            type: 'number',
            showValue: selected,
            attach,
            onSubmit: this._selectDynamic.bind(this, item)
        })
    }

    _onMouseOut = e => {
        this.props.popDropdown(dropdownType.inputValue)
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            value: item.key,
            valueType: item.valueType
        })
        this.props.showDropdown()
    }

    _selectDynamic = (item, number) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            value: item.key,
            dynamic: number,
            valueType: item.valueType,
        })
        this.props.showDropdown()
    }
    
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const selected = typeof currentValue === 'string' && currentValue === item.key

        if (item.valueType === valueType.dynamicVal) {
            return (
                <div
                    key={item.key}
                    className="drop-down-menu-option"
                    onMouseOver={this._onMouseOver.bind(this, item)}
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

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                onMouseOver={this._onMouseOut}
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
        let items = _.filter(updateType, i => i.family === updateFamilyType.number)
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
        popDropdown,
    }
)(PickUpdate)