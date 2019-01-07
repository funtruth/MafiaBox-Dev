import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { showDropdownByKey, popDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVar extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: item.key,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdownByKey()
    }

    _onShowProps = (item, e) => {
        this.props.showDropdownByKey(dropdownType.pickVarProp, e, {
            prefix: item.key,
            forcedKey: dropdownType.pickVar,
        })
    }
    
    _onMouseOut = (dropdownType, e) => {
        //if NOT leaving from right side
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdownByKey(dropdownType)
        }
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const selected = typeof currentValue === 'string' && currentValue === item.key
        const isObject = item.variableType === variableType.object.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={isObject ? undefined : this._onSelect.bind(this, item)}
                onMouseOver={isObject && this._onShowProps.bind(this, item)}
                onMouseOut={isObject && this._onMouseOut.bind(this, dropdownType.pickVarProp)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                }}
            >
                {item.key}
                {isObject && <i
                    className="ion-ios-play"
                    style={{
                        marginLeft: 'auto',
                    }}
                />}
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
    
    _onConstant = (e) => {
        this.props.showDropdownByKey(dropdownType.inputValue, e, {
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._setConstant,
            forcedKey: dropdownType.pickVar,
        })
    }

    _setConstant = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: null,
            [`${subfieldKey}.adjust`]: value,
        })
        this.props.showDropdownByKey()
    }

    _onAdjust = (show, e) => {
        if (!show) {
            this.props.popDropdownByKey(dropdownType.inputValue)
        } else {
            this.props.showDropdownByKey(dropdownType.inputValue, e, {
                inputText: 'Enter a number',
                type: 'number',
                showValue: true,
                onSubmit: this._setAdjustment,
                forcedKey: dropdownType.pickVar,
            })
        }
    }

    _setAdjustment = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey + ".adjust", value)
        this.props.showDropdownByKey()
    }

    render() {
        const { attach, currentValue } = this.props
        const vars = _.toArray(attach)

        const isNumber = attach[currentValue] &&
            attach[currentValue].variableType === variableType.number.key

        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        if (!attach) return null

        return (
            <div>
                <div style={menuStyle}>
                    {vars.map(this._renderItem)}
                </div>
                <div className="drop-down-menu-separator"/>
                <div
                    className="drop-down-menu-option"
                    onMouseOver={this._onConstant}
                    onMouseOut={this._onMouseOut.bind(this, dropdownType.inputValue)}
                >
                    <i className={`drop-down-menu-icon mdi mdi-alpha-c-box`}></i>
                    Constant
                </div>
                <div
                    className="drop-down-menu-option"
                    onMouseOver={this._onAdjust.bind(this, isNumber)}
                >
                    <i className={`drop-down-menu-icon mdi mdi-numeric`}></i>
                    Adjust by
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
        showDropdownByKey,
        popDropdownByKey,
    }
)(PickVar)