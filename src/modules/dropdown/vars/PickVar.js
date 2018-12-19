import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVar extends React.Component{
    _onMouseOver = (e) => {
        const { dropdownParams, dropdownData } = this.props
        const { pageX, pageY, hoverKey, currentValue } = dropdownParams
        

        
        //TODO apply e.target.offsetheight to more of these so less hacky
        this.props.showDropdownByKey(dropdownType.inputValue, {
            ...dropdownParams,
            pageX: pageX + e.target.offsetWidth,
            pageY: e.pageY - (e.pageY - pageY - e.target.offsetTop) % e.target.offsetHeight - 8,
            inputText: 'Enter a number',
            type: 'number',
            showValue: true,
            onSubmit: this._selectDynamic
        })
    }

    _setAdjustment = () => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'hi')
        this.props.showDropdownByKey()
    }

    _renderItem = (item) => {
        const { dropdownParams } = this.props
        const { currentValue } = dropdownParams

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
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams
        
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