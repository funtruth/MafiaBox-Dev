import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../common/types'

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

/*@param prefix => used with rssMap to find the proper fields
  @param prefix: describes the previous prefix used to get to current PickVarSubfield
    PickVarSubfield should used to find the subfields of a field, AND THEN select
    This follows a different path than ShowSubfields because we want to be able to refer to game values
        example: gameState(phase)
Used from:
    PickVar
*/
export default function PickVarSubfield({
    prefix,
    slate,
    scopedVars,
    pickVarClick,
    showDropdown,
}){
    //get subfields to show
    const subfields = getSubfields(prefix)
    
    //field is a UidObject if there is only 1 subfield and the subfield is WILD_CHAR
    const isUidObject = subfields.length === 1 && subfields[0].subfield === WILD_CHAR

    const renderItem = (item, key) => {
        const hasObject = VARTYPE_IS_OBJ(item)
        const combinedField = concatField(prefix, key)

        if (isUidObject || hasObject) {
            return (
                <DropParent
                    key={key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={showDropdown}
                    params={{
                        prefix: combinedField,
                    }}
                    text={key}
                />
            )
        }
        
        //if item not nested, check if item is currently selected
        const chosen = slate.value === combinedField
        return (
            <DropItem
                key={key}
                chosen={chosen}
                onClick={() => pickVarClick(item)}
                rightCheck
                text={key}
            />
        )
    }
    

    //get all subfields that exist in rssMap, corresponding to prefix
    //subfields is guaranteed to be an array
    if (subfields.length === 0) {
        return (
            <DropScroll>
                <DropTitle>results</DropTitle>
                <DropEmpty text="no results found"/>
            </DropScroll>
        )
    }

    if (subfields[0].subfield === WILD_CHAR) {
        //get all uids from attached variables
        const uids = _.filter(scopedVars, VARTYPE_IS_UID)

        return (
            <DropScroll>
                <DropTitle>uids</DropTitle>
                {uids.map(item => renderItem(item, item.key))}
                <DropEmpty list={uids} text="no results found"/>
            </DropScroll>
        )
    }

    return (
        <DropScroll>
            <DropTitle>subfields</DropTitle>
            {subfields.map(item => renderItem(item, item.subfield))}
            <DropEmpty list={subfields} text="no results found"/>
        </DropScroll>
    )
}