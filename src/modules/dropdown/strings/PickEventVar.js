import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    variableType,
} from '../../common/types'
import { rssMap } from '../../common/defaults'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle'
import { DropScroll } from '../components/Common';

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
        const rssVars = _.filter(rssMap, i => i.fieldLength === 2)

        return (
            <>
                {vars.true && <div>
                    <DropTitle>uids</DropTitle>
                    <DropScroll>{vars.true.map(this._renderItem)}</DropScroll>
                </div>}
                {vars.false && <div>
                    <DropTitle>variables</DropTitle>
                    <DropScroll>{vars.false.map(this._renderItem)}</DropScroll>
                </div>}
                <DropTitle>game variables</DropTitle>
                <DropScroll>{rssVars.map(this._renderItem)}</DropScroll>
            </>
        )
    }
}