import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType, panelType, updateViewType } from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

class PickVarProp extends React.Component{
    _onSelect = (item, key) => {
        const { prefix } = this.props
        this.props.updatePage({
            value: `${prefix}.${key}`,
            variableTypes: [item.variableType],
            updateViewType: updateViewType.variable,
            adjust: null,
            panelType: panelType.var.key,
            length: false,
        })
        this.props.showDropdown()
    }

    _renderItem = (item, key) => {
        const { attach, subfieldKey, prefix, updateRef } = this.props
        const selectedValue = attach[subfieldKey] || {}
        
        const vars = proptool.getSubfields(`${prefix}.${key}`, updateRef)
        const chosen = selectedValue.value === `${prefix}.${key}`
        const isObject = vars.length > 0
        
        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={key}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: `${prefix}.${key}`,
                        subpath: [`${prefix}.${key}`],
                    }}
                    text={key}
                />
            )
        }

        return (
            <div
                key={key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item, key)}
            >
                {key}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
    
    render() {
        const { updateRef, prefix, attachVar } = this.props

        const subfields = proptool.getSubfields(prefix, updateRef)
        const uids = _.filter(attachVar, i => i.variableTypes.includes(variableType.uid.key))
        
        return (
            <div className="drop-down-scrollable">
                {subfields.length ?
                    subfields[0].subfield === '$' ?
                        <>
                            <DropTitle>uids</DropTitle>
                            {uids.map(item => this._renderItem(item, item.key))}
                            <DropEmpty>no results found</DropEmpty>
                        </>
                        :<>
                            <DropTitle>subfields</DropTitle>
                            {subfields.map(item => this._renderItem(item, item.subfield))}
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

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(PickVarProp)