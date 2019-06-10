import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types';

import { usePath } from '../../hooks/Hooks';
import { concatField } from '../../logic/proptool'

import {
    DropEmpty,
    DropItem,
    DropScroll,
    DropTitle,
 } from '../components/Common'

/*@param prefix => used with getSubfields to find a list of fields
two possible paths:
    IF field is a WILDCARD, show all uid's
    ELSE, show all subfields
Used from: PickVar, PickVarWithType
*/
export default function PickVarTags({
    prefix,//passed
    slate,
    pickVarClick,//passed
}){
    const items = usePath(['fieldRepo', 'playerTags', 'data'])
    const tags = _.sortBy(items, i => i.index)

    const handleSelect = (item) => {
        pickVarClick({
            display: item.title,
            value: concatField(prefix, item.key),
            variableTypes: [variableType.boolean.key]
        })
    }

    const renderItem = (item) => {
        //if item not nested, check if item is currently selected
        const chosen = slate.value === concatField(prefix, item.key)
        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightCheck
                text={item.title}
            />
        )
    }

    return (
        <DropScroll>
            <DropTitle>tags</DropTitle>
            {tags.map(renderItem)}
            <DropEmpty list={tags} text="no results found"/>
        </DropScroll>
    )
}