import React from 'react'

import { dropdownType, variableType } from '../../common/types'

import {
    getSubfields,
    concatField,
    WILD_CHAR,
} from '../../logic/proptool'
import { VARTYPE_IS_OBJ } from '../../common/arrows';
import { useVarType } from '../../hooks/Hooks';

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropScroll,
    DropTitle,
 } from '../components/Common'

/*@param prefix => used with getSubfields to find a list of fields
two possible paths:
    IF field is a WILDCARD, show all uid's
    ELSE, show all subfields
Used from: PickVar, PickVarWithType
*/
export default function PickVarSubfield({//WIP
    prefix,//passed
    slate,
    scopedVars,//passed
    pickVarClick,//passed
    showDropdown,
}){
    //get subfields to show
    const subfields = getSubfields(prefix)

    const renderUIDs = () => {
        const [tameVars, wildVars] = useVarType([variableType.uid.key], scopedVars)
        return (
            <div key={prefix}>
                {tameVars.map(renderWild)}
                <DropEmpty list={tameVars} text="no variables found"></DropEmpty>
                <DropTitle>incomplete vars</DropTitle>
                {wildVars.map(renderWild)}
                <DropEmpty list={wildVars} text="no variables found"></DropEmpty>
            </div>
        )
    }

    const renderWild = (item) => {
        return (
            <DropParent
                key={item.key}
                dropdown={dropdownType.pickVarSubfield}
                showDropdown={showDropdown}
                params={{
                    prefix: concatField(prefix, item.value),
                }}
                text={item.display}
            />
        )
    }

    const renderItem = (item) => {
        const hasObject = VARTYPE_IS_OBJ(item)

        if (hasObject) {
            return (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickVarSubfield}
                    showDropdown={showDropdown}
                    params={{
                        prefix: item.value,
                    }}
                    text={item.display}
                />
            )
        }
        
        //if item not nested, check if item is currently selected
        const chosen = slate.value === item.value
        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => pickVarClick(item)}
                rightCheck
                text={item.display}
            />
        )
    }

    return (
        <DropScroll>
            <DropTitle>subfields</DropTitle>
            {subfields.map(item => {
                if (item.value.substr(-3) === concatField("", WILD_CHAR)) {
                    return renderUIDs()
                }
                return renderItem(item)
            })}
            <DropEmpty list={subfields} text="no results found"/>
        </DropScroll>
    )
}