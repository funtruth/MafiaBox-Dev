import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import {
    updateViewType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    WILD_CHAR,
    concatField,
    getSubfields,
} from '../../logic/proptool'
import {
    VARTYPE_IS_UID,
    VARTYPE_IS_OBJ,
} from '../../common/arrows';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
 } from '../components/Common'

/*@param prefix => used with updateRef to find the proper fields
  @param prefix: describes the previous prefix used to get to current PickVarProp
    PickVarProp should used to find the subfields of a field, AND THEN select
    This follows a different path than ShowSubfields because we want to be able to refer to game values
        example: gameState(phase)
*/
function PickVarProp(props) {
    const { prefix, updateRef, currentValue, attachVar } = props

    //get subfields to show
    const subfields = getSubfields(prefix, updateRef)

    //field is a UidObject if there is only 1 subfield and the subfield is WILD_CHAR
    const isUidObject = subfields.length === 1 && subfields[0].subfield === WILD_CHAR

    const handleSelect = (item, key) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            updateViewType: updateViewType.variable,
            value: concatField(prefix, key),
            display: concatField(prefix, key),
            variableTypes: item.variableTypes,
        })
        props.showDropdown()
    }

    const renderItem = (item, key) => {
        const hasObject = VARTYPE_IS_OBJ(item)
        const combinedField = concatField(prefix, key)

        if (isUidObject || hasObject) {
            return (
                <DropParent
                    {...props}
                    key={key}
                    dropdownType={dropdownType.pickVarProp}
                    params={{
                        prefix: combinedField,
                        subpath: [combinedField],
                    }}
                    text={key}
                />
            )
        }
        
        //if item not nested, check if item is currently selected
        const chosen = currentValue.value === combinedField
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

    if (subfields[0].subfield === WILD_CHAR) {
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