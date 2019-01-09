import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateType, valueType, updateFamilyType } from '../../logic/types'
import { dropdownType } from '../types'

import { updatePageByPath } from '../../page/PageReducer'

class PickUpdate extends React.Component{
    _onMouseOver = (item, e) => {
        const { hoverKey, currentValue, attach } = this.props
        if (item.key === hoverKey) return
        
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        
        this.props.showDropdown(dropdownType.inputValue, e, {
            hoverKey: item.key,
            inputText: 'Enter a number',
            type: 'number',
            showValue: chosen,
            attach,
            onSubmit: this._selectDynamic.bind(this, item)
        })
    }

    _onMouseOut = () => {
        this.props.popDropdownTo()
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
        
        const chosen = typeof currentValue === 'string' && currentValue === item.key

        if (item.valueType === valueType.dynamicVal) {
            return (
                <div
                    key={item.key}
                    className="drop-down-menu-option"
                    chosen={chosen.toString()}
                    onMouseOver={this._onMouseOver.bind(this, item)}
                >
                    <i className={`${item.icon} drop-down-menu-icon`}/>
                    {item.title}
                    {chosen && <i className="ion-md-checkmark"/>}
                </div>
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                onMouseOver={this._onMouseOut}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
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
    }
)(PickUpdate)