import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickVar extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: item.key,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdown()
    }

    _onShowProps = (item, e) => {
        this.props.showDropdown(dropdownType.pickVarProp, e, {
            prefix: item.key,
        })
    }
    
    _onMouseOut = e => {
        //if NOT leaving from right side
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdownTo()
        }
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        const isObject = item.variableType === variableType.object.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={isObject ? undefined : this._onSelect.bind(this, item)}
                onMouseOver={isObject ? this._onShowProps.bind(this, item) : undefined}
                onMouseOut={isObject ? this._onMouseOut : undefined}
            >
                {item.key}
                {isObject && <i
                    className="ion-ios-play"
                    style={{
                        marginLeft: 'auto',
                    }}
                />}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }
    
    _onConstant = (e) => {
        this.props.showDropdown(dropdownType.inputValue, e, {
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._setConstant,
        })
    }

    _setConstant = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: null,
            [`${subfieldKey}.adjust`]: value,
        })
        this.props.showDropdown()
    }

    _onAdjust = (show, e) => {
        if (!show) {
            this.props.popDropdownTo(dropdownType.inputValue)
        } else {
            this.props.showDropdown(dropdownType.inputValue, e, {
                inputText: 'Enter a number',
                type: 'number',
                showValue: true,
                onSubmit: this._setAdjustment,
            })
        }
    }

    _setAdjustment = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.adjust`, value)
        this.props.showDropdown()
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
                    onMouseOut={this._onMouseOut}
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
    }
)(PickVar)