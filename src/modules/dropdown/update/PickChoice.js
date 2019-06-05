import React from 'react'
import _ from 'lodash'

import {
    parseType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import {
    VARTYPE_IS_UID,
} from '../../common/arrows';

import {
    DropEmpty,
    DropItem,
    DropTitle,
} from '../components/Common'

export default function PickChoice(props) {
    const { attachVar, attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}

    const handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            value: item.key || "$\"\"", //HACK
            parseBy: parseType.variable,
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = currentValue.value === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightCheck
                text={item.key}
            />
        )
    }

    const chosen = currentValue.value === "$\"\""

    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    return (
        <>
            <DropTitle>uids</DropTitle>
            {uids.map(renderItem)}
            <DropEmpty list={uids} text="no UIDS found"/>
            <DropTitle>options</DropTitle>
            <DropItem
                chosen={chosen}
                onClick={handleSelect}
                leftIcon="message-bulleted-off"
                rightCheck
                text="no choice"
            />
        </>
    )
}