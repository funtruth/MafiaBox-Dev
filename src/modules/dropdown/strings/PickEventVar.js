import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../types'
import {
    variableType,
    rssMap,
} from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle'

export default class PickEventVar extends React.Component{
    _onSelect = (item) => {
        const { string, range } = this.props
        const { startIndex, endIndex } = range
        
        this.props.updatePage({
            string: `${string.slice(0, startIndex)}${item.key}${string.slice(endIndex)}`,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        
        const isObject = item.variableTypes && item.variableTypes.includes(variableType.object.key)

        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.pickEventVarProp}
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
        if (!attachVar) return null

        const vars = _.groupBy(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
        const rssVars = _.filter(rssMap, i => i.variableTypes && i.variableTypes.includes(variableType.rss.key))

        return (
            <div>
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