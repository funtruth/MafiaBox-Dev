import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

import DropParent from '../components/DropParent'
import BoardLib from '../library/BoardLib';

class PickVar extends React.Component{
    _onSelect = (item) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: item.key,
            [`${subfieldKey}.adjust`]: null
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        const isObject = item.variableType === variableType.object.key

        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: item.key,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item)}
            >
                {item.key}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _setConstant = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', {
            [subfieldKey]: null,
            [`${subfieldKey}.adjust`]: value,
        })
        this.props.showDropdown()
    }

    _setAdjustment = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.adjust`, value)
        this.props.showDropdown()
    }

    render() {
        const { attachVar, currentValue } = this.props
        const vars = _.toArray(attachVar)

        const isNumber = attachVar[currentValue] &&
            attachVar[currentValue].variableType === variableType.number.key

        let menuStyle = {
            maxHeight: 200,
            overflow: 'auto',
        }

        if (!attachVar) return null
        return (
            <div>
                <BoardLib {...this.props}/>
                <div className="drop-down-menu-separator"/>
                <div style={menuStyle}>
                    {vars.map(this._renderItem)}
                </div>
                <div className="drop-down-menu-separator"/>
                <DropParent
                    {...this.props}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: true,
                        onSubmit: this._setConstant,
                    }}
                    icon="mdi mdi-alpha-c-box"
                    text="Constant"
                />
                <DropParent
                    {...this.props}
                    dropdownType={isNumber && dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: true,
                        onSubmit: this._setAdjustment,
                    }}
                    icon="mdi mdi-numeric"
                    text="Adjust by"
                />
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