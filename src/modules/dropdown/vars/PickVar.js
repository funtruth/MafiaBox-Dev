import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { dropdownType, VAR_DEFAULTS } from '../types'
import { variableType, panelType, updateViewType } from '../../logic/types'

import DropParent from '../components/DropParent'
import BoardLib from '../library/BoardLib';
import DropTitle from '../components/DropTitle';
import DropOption from '../components/DropOption'

class PickVar extends React.Component{
    _onSelect = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            updateViewType: updateViewType.uid,
            value: item.key,
            variableTypes: item.variableTypes,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const selectedValue = attach[subfieldKey] || {}
        
        const chosen = selectedValue.value === item.key
        const isObject = item.variableTypes.includes(variableType.object.key)

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
            ...VAR_DEFAULTS,
            adjust: value,
            panelType: panelType.var.key,
            updateViewType: updateViewType.number,
        })
        this.props.showDropdown()
    }

    _setAdjustment = (value) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            adjust: value,
        })
        this.props.showDropdown()
    }

    _setLength = () => {
        const { attach, subfieldKey } = this.props
        const selectedValue = attach[subfieldKey] || {}
        
        this.props.updatePage({
            length: !selectedValue.length,
        })
        this.props.showDropdown()
    }

    render() {
        const { attachVar, attach, subfieldKey, updateRef } = this.props
        const selectedValue = attach[subfieldKey] || {}
        const { variableTypes } = selectedValue || []

        const vars = _.groupBy(attachVar, i => i.variableTypes.includes(variableType.uid.key))
        const rssVars = _.filter(updateRef, i => i.variableTypes.includes(variableType.rss.key))
        
        const isNumber = variableTypes.includes(variableType.number.key)
        const hasLength = variableTypes.includes(variableType.object.key)

        return (
            <div>
                <BoardLib {...this.props}/>
                {rssVars.length > 0 && <div>
                    <DropTitle>game values</DropTitle>
                    <div className="drop-down-scrollable">
                        {rssVars.map(this._renderItem)}
                    </div>
                </div>}
                {vars.true && <div>
                    <DropTitle>uids</DropTitle>
                    <div className="drop-down-scrollable">
                        {vars.true.map(this._renderItem)}
                    </div>
                </div>}
                {vars.false && <div>
                    <DropTitle>variables</DropTitle>
                    <div className="drop-down-scrollable">
                        {vars.false.map(this._renderItem)}
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
                    dropdownType={dropdownType.pickBoolean}
                    icon="mdi mdi-code-tags-check"
                    text="boolean"
                />
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
                    chosen={selectedValue.length}
                    onClick={this._setLength}
                    icon="mdi mdi-code-braces"
                >length</DropOption>
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PickVar)