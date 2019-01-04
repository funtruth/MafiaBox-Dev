import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVar extends React.Component{
    _onSelect = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: value,
            [subfieldKey + ".adjust"]: null
        })
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const selected = typeof currentValue === 'string' && currentValue === item.key
        
        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._onSelect.bind(this, item.key)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6'
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
    
    _onConstant = (e) => {
        this.props.showDropdownByKey(dropdownType.inputValue, e, {
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._setConstant
        })
    }

    _setConstant = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey + ".adjust"]: value,
            [subfieldKey]: null,
        })
        this.props.showDropdownByKey()
    }

    _onAdjust = (show, e) => {
        if (!show) return
        this.props.showDropdownByKey(dropdownType.inputValue, e, {
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._setAdjustment
        })
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
    }
)(PickVar)