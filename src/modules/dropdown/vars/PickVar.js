import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType, panelType } from '../../logic/types'

import DropParent from '../components/DropParent'
import BoardLib from '../library/BoardLib';

class PickVar extends React.Component{
    _onSelect = (item) => {
        this.props.updatePage({
            value: item.key,
            type: panelType.var.key,
            adjust: null,
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
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    _setConstant = (value) => {
        this.props.updatePageByPath({
            value: null,
            type: panelType.var.key,
            adjust: value,
        })
        this.props.showDropdown()
    }

    _setAdjustment = (value) => {
        this.props.updatePageByPath({
            adjust: value,
        })
        this.props.showDropdown()
    }

    render() {
        const { attachVar, currentValue } = this.props
        if (!attachVar) return null

        const vars = _.toArray(attachVar)
        const uids = vars.filter(i => i.variableType === variableType.uid.key)
        const otherVars = vars.filter(i => i.variableType !== variableType.uid.key && !i.rss)
        const rssVars = vars.filter(i => i.rss)

        const isNumber = attachVar[currentValue] &&
            attachVar[currentValue].variableType === variableType.number.key

        return (
            <div>
                <BoardLib {...this.props}/>
                {uids.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">UIDS</div>
                    <div className="drop-down-scrollable">
                        {uids.map(this._renderItem)}
                    </div>
                </div>}
                {otherVars.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">VARIABLES</div>
                    <div className="drop-down-scrollable">
                        {otherVars.map(this._renderItem)}
                    </div>
                </div>}
                {rssVars.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">GAME VARIABLES</div>
                    <div className="drop-down-scrollable">
                        {rssVars.map(this._renderItem)}
                    </div>
                </div>}
                <div className="-sep"/>
                <div className="drop-down-title">OTHER OPTIONS</div>
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
                {isNumber && <DropParent
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
                />}
            </div>
        )
    }
}

export default PickVar