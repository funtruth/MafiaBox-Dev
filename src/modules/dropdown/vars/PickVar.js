import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVar extends React.Component{
    _onMouseOver = (e) => {
        this.props.showDropdownByKey(dropdownType.inputValue, e, {
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._setAdjustment
        })
    }

    _setAdjustment = () => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'hi')
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props

        const selected = typeof currentValue === 'string' && currentValue === item.key
        
        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item.key)}
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

    _select = (newValue) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, newValue)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownData } = this.props
        const vars = _.toArray(dropdownData)

        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        if (!dropdownData) return null

        return (
            <div>
                <div style={menuStyle}>
                    {vars.map(this._renderItem)}
                </div>
                <div className="drop-down-menu-separator"/>
                <div
                    className="drop-down-menu-option"
                    onMouseOver={this._onMouseOver}
                >
                    <i className={`drop-down-menu-icon mdi mdi-numeric`}></i>
                    Adjust by
                </div>
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
    }
)(PickVar)