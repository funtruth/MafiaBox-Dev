import React from 'react'
import _ from 'lodash'

import { dropdownType, VAR_DEFAULTS } from '../types'
import { variableType, panelType, updateViewType } from '../../logic/types'

import DropParent from '../components/DropParent'
import BoardLib from '../library/BoardLib';
import DropTitle from '../components/DropTitle';

class PickObject extends React.Component{
    _onSelect = (item) => {
        this.props.updatePage({
            ...VAR_DEFAULTS,
            panelType: panelType.var.key,
            updateViewType: updateViewType.uid,
            value: item.key,
            variableType: item.variableType,
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

    render() {
        const { attachVar } = this.props

        const vars = _.toArray(attachVar)
        const uids = vars.filter(i => i.variableTypes.includes(variableType.uid.key))
        const otherVars = vars.filter(i => i.variableTypes.includes(variableType.uid.key) && !i.rss)
        const rssVars = vars.filter(i => i.rss)
        
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
            </div>
        )
    }
}

export default PickObject