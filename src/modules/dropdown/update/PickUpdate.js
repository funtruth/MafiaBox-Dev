import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { valueType, updateType } from '../../logic/types'
import { dropdownType } from '../types'

import { showDropdownByKey, popHighestDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickUpdate extends React.Component{
    _onMouseOver = (item, e) => {
        const { hoverKey, currentValue } = this.props
        if (item.key === hoverKey) return
        
        const selected = typeof currentValue === 'string' && currentValue === item.key
        
        this.props.showDropdownByKey(dropdownType.inputValue, e, {
            hoverKey: item.key,
            inputText: 'Enter a number',
            type: 'number',
            showValue: selected,
            onSubmit: this._selectDynamic.bind(this, item)
        })
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            value: item.key,
            updateType: item.updateType
        })
        this.props.showDropdownByKey()
    }

    _selectDynamic = (item, number) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            value: item.key,
            dynamic: number,
            updateType: item.updateType,
        })
        this.props.showDropdownByKey()
    }
    
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const selected = typeof currentValue === 'string' && currentValue === item.key

        if (item.updateType === updateType.dynamicVal) {
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
        popHighestDropdown,
    }
)(PickUpdate)