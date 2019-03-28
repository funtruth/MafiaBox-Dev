import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { variableType, panelType, updateViewType } from '../../logic/types'

import DropParent from '../components/DropParent'
import DropItem from '../components/DropItem'
import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

//@param prefix -> used with updateRef to find the proper fields
function PickVarProp(props) {
    const { prefix, subfieldKey, updateRef, attach, attachVar } = props

    const handleSelect = (item, key) => {
        props.updatePage({
            value: `${prefix}_${key}`,
            variableTypes: item.variableTypes,
            updateViewType: updateViewType.variable,
            adjust: null,
            panelType: panelType.var.key,
            length: false,
        })
        props.showDropdown()
    }

    const renderItem = (item, key) => {
        //if item is an object, render another nested DropParent
        const isObject = item.variableTypes && item.variableTypes.includes(variableType.object.key)

        if (isObject) {
            return (
                <DropParent
                    {...props}
                    key={key}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: `${prefix}_${key}`,
                        subpath: [`${prefix}_${key}`],
                    }}
                    text={key}
                />
            )
        }
        
        //if item not nested, check if item is currently selected
        const selectedValue = attach[subfieldKey] || {}
        const chosen = selectedValue.value === `${prefix}_${key}`

        return (
            <DropItem
                key={key}
                chosen={chosen}
                onClick={() => handleSelect(item, key)}
                rightIcon="mdi mdi-check"
            >
                {key}
            </DropItem>
        )
    }
    

    //get all subfields that exist in updateRef, corresponding to prefix
    const subfields = proptool.getSubfields(prefix, updateRef)

    //get all uids from attached variables
    const uids = _.filter(attachVar, i => i && i.variableTypes && i.variableTypes.includes(variableType.uid.key))
    
    return (
        <div className="drop-down-scrollable">
            {subfields.length ?
                //if subfield from updateRef is @, it means we must pick a uid to continue
                subfields[0].subfield === '@' ?
                    <>
                        <DropTitle>uids</DropTitle>
                        {uids.map(item => renderItem(item, item.key))}
                        <DropEmpty>no results found</DropEmpty>
                    </>
                    :<>
                        <DropTitle>subfields</DropTitle>
                        {subfields.map(item => renderItem(item, item.subfield))}
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

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(PickVarProp)