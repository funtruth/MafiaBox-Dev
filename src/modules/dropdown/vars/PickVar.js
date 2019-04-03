import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { dropdownType, VAR_DEFAULTS } from '../types'
import { variableType, panelType, updateViewType } from '../../logic/types'

import { VARTYPE_IS_OBJ } from '../../common/arrows';

import BoardLib from '../library/BoardLib';
import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';
import DropOption from '../components/DropOption'

function PickVar(props) {
    const { attachVar, attach, subfieldKey, updateRef } = props
    const selectedValue = attach[subfieldKey] || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            updateViewType: updateViewType.uid,
            value: item.key,
            variableTypes: item.variableTypes,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = selectedValue.value === item.key

        if (VARTYPE_IS_OBJ(item)) {
            return (
                <DropParent
                    {...props}
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
                onClick={() => handleSelect(item)}
            >
                {item.key}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    const setConstant = (value) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            adjust: value,
            panelType: panelType.var.key,
            updateViewType: updateViewType.number,
        })
        props.showDropdown()
    }

    const setAdjustment = (value) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            adjust: value,
        })
        props.showDropdown()
    }

    const setLength = () => {
        props.updatePage({
            length: !selectedValue.length,
        })
        props.showDropdown()
    }
    
    const vars = _.groupBy(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
    const rssVars = _.filter(updateRef, i => i.variableTypes && i.variableTypes.includes(variableType.rss.key))

    return (
        <>
            {rssVars.length > 0 && <div>
                <DropTitle>game values</DropTitle>
                <div className="drop-down-scrollable">
                    {rssVars.map(renderItem)}
                </div>
            </div>}
            {vars.true && <div>
                <DropTitle>uids</DropTitle>
                <div className="drop-down-scrollable">
                    {vars.true.map(renderItem)}
                </div>
            </div>}
            {vars.false && <div>
                <DropTitle>variables</DropTitle>
                <div className="drop-down-scrollable">
                    {vars.false.map(renderItem)}
                </div>
            </div>}
            <DropTitle>other options</DropTitle>
            <DropParent
                {...props}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    showValue: true,
                    onSubmit: setAdjustment,
                }}
                icon="mdi mdi-numeric"
                text="adjust by"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.pickBoolean}
                icon="mdi mdi-code-tags-check"
                text="boolean"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Enter a number',
                    type: 'number',
                    showValue: true,
                    onSubmit: setConstant,
                }}
                icon="mdi mdi-numeric"
                text="constant"
            />
            <DropOption
                show={false}
                chosen={selectedValue.length}
                onClick={setLength}
                icon="mdi mdi-code-braces"
            >length</DropOption>
            <DropTitle>library</DropTitle>
            <BoardLib {...props}/>
        </>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PickVar)