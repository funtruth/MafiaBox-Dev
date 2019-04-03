import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../../logic/proptool'

import { dropdownType } from '../types'
import { panelType, updateViewType } from '../../logic/types'

import { VARTYPE_IS_UID, VARTYPE_IS_OBJ } from '../../common/arrows';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
 } from '../components/Common'

//@param prefix -> used with updateRef to find the proper fields
function PickVarProp(props) {
    const { prefix, subfieldKey, updateRef, attach, attachVar } = props

    const selectedValue = attach[subfieldKey] || {}
    const subfields = proptool.getSubfields(prefix, updateRef)
    console.log({subfields})
    //if the entire field is an object, only render nested DropParents
    const isObject = subfields.length === 1 && VARTYPE_IS_OBJ(subfields[0])

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
        const hasObject = VARTYPE_IS_OBJ(item)
        if (isObject || hasObject) {
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
    //subfields is guaranteed to be an array
    if (subfields.length === 0) {
        return (
            <DropScroll>
                <DropTitle>results</DropTitle>
                <DropEmpty>no results found</DropEmpty>
            </DropScroll>
        )
    }

    if (subfields[0].subfield === '@') {
        //get all uids from attached variables
        const uids = _.filter(attachVar, VARTYPE_IS_UID)

        return (
            <DropScroll>
                <DropTitle>uids</DropTitle>
                {uids.map(item => renderItem(item, item.key))}
                <DropEmpty>no results found</DropEmpty>
            </DropScroll>
        )
    }

    return (
        <DropScroll>
            <DropTitle>subfields</DropTitle>
            {subfields.map(item => renderItem(item, item.subfield))}
            <DropEmpty>no results found</DropEmpty>
        </DropScroll>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(PickVarProp)