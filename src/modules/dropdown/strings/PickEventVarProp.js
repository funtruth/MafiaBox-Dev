import React from 'react'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import {
    variableType,
} from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle'
import DropEmpty from '../components/DropEmpty'

export default class PickEventVarProp extends React.Component{
    _onSelect = (item) => {
        const { attach, selectedKey, range, prefix } = this.props
        const selectedItem = (attach.value && attach.value[selectedKey]) || {}
        const string = selectedItem.string || ''

        const { startIndex, endIndex } = range
        
        this.props.updatePage({
            string: `${string.slice(0, startIndex)}${prefix}_${item}${string.slice(endIndex)}`
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue, prefix } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === `${prefix}_${item}`
        
        const vars = proptool.getSubfields(`${prefix}_${item}`)
        const isObject = vars.length > 0
        
        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item}
                    dropdownType={dropdownType.pickEventVarProp}
                    params={{
                        prefix: `${prefix}_${item}`,
                    }}
                    text={item}
                />
            )
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item)}
            >
                {item}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
    
    render() {
        const { prefix, attachVar } = this.props
        const subfields = proptool.getSubfields(prefix)
        const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
        
        return (
            <div className="drop-down-scrollable">
                {subfields.length ?
                    subfields[0].subfield === '@' ?
                        <>
                            <DropTitle>uids</DropTitle>
                            {uids.map(item => this._renderItem(`${item.key}`))}
                            <DropEmpty>no results found</DropEmpty>
                        </>
                        :<>
                            <DropTitle>subfields</DropTitle>
                            {subfields.map(item => this._renderItem(item.subfield))}
                            <DropEmpty>no results found</DropEmpty>
                        </>
                    :<>
                        <DropTitle>results</DropTitle>
                        <DropEmpty>no results found</DropEmpty>
                    </>
                }
            </div>
        )
    }
}