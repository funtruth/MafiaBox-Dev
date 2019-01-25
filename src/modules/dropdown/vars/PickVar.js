import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType, panelType } from '../../logic/types'

import DropParent from '../components/DropParent'
import BoardLib from '../library/BoardLib';
import DropTitle from '../components/DropTitle';
import DropOption from '../components/DropOption'

class PickVar extends React.Component{
    _onSelect = (item) => {
        this.props.updatePage({
            value: item.key,
            variableType: item.variableType,
            type: panelType.var.key,
            adjust: null,
            length: false,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = currentValue.value === item.key
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
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    _setConstant = (value) => {
        this.props.updatePage({
            value: null,
            type: panelType.var.key,
            adjust: value,
            length: false,
        })
        this.props.showDropdown()
    }

    _setAdjustment = (value) => {
        this.props.updatePage({
            adjust: value,
            length: false,
        })
        this.props.showDropdown()
    }

    _setLength = () => {
        const { currentValue } = this.props
        this.props.updatePage({
            length: !currentValue.length,
        })
        this.props.showDropdown()
    }

    render() {
        const { attachVar, currentValue } = this.props

        const vars = _.toArray(attachVar)
        const uids = vars.filter(i => i.variableType === variableType.uid.key)
        const otherVars = vars.filter(i => i.variableType !== variableType.uid.key && !i.rss)
        const rssVars = vars.filter(i => i.rss)

        const isNumber = currentValue.variableType === variableType.number.key
        const hasLength = currentValue.variableType === variableType.object.key

        return (
            <div>
                <BoardLib {...this.props}/>
                {uids.length > 0 && <div>
                    <DropTitle>uids</DropTitle>
                    <div className="drop-down-scrollable">
                        {uids.map(this._renderItem)}
                    </div>
                </div>}
                {otherVars.length > 0 && <div>
                    <DropTitle>variables</DropTitle>
                    <div className="drop-down-scrollable">
                        {otherVars.map(this._renderItem)}
                    </div>
                </div>}
                {rssVars.length > 0 && <div>
                    <DropTitle>game variables</DropTitle>
                    <div className="drop-down-scrollable">
                        {rssVars.map(this._renderItem)}
                    </div>
                </div>}
                <DropTitle>other options</DropTitle>
                {isNumber && <DropParent
                    {...this.props}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: true,
                        onSubmit: this._setAdjustment,
                    }}
                    icon="mdi mdi-numeric"
                    text="adjust by"
                />}
                <DropParent
                    {...this.props}
                    dropdownType={dropdownType.inputValue}
                    params={{
                        inputText: 'Enter a number',
                        type: 'number',
                        showValue: true,
                        onSubmit: this._setConstant,
                    }}
                    icon="mdi mdi-numeric"
                    text="constant"
                />
                <DropOption
                    show={hasLength}
                    chosen={currentValue.length}
                    onClick={this._setLength}
                    icon="mdi mdi-code-braces"
                    backgroundColor="#2e6db4"
                >length</DropOption>
            </div>
        )
    }
}

export default PickVar