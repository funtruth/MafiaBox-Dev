import React from 'react'
import _ from 'lodash'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types'

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
            ...VAR_DEFAULTS,
            update: true,
            value: item.key || "$\"\"", //HACK
            updateType: updateType.uid,
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
                rightIcon="mdi mdi-check"
            >
                {item.key}
            </DropItem>
        )
    }

    const chosen = currentValue.value === "$\"\""

    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    return (
        <>
            <DropTitle>uids</DropTitle>
            <div>
                {uids.map(renderItem)}
                <DropEmpty>no UIDS found</DropEmpty>
            </div>
            <DropTitle>options</DropTitle>
            <DropItem
                chosen={chosen}
                onClick={handleSelect}
                leftIcon="mdi mdi-message-bulleted-off"
                rightIcon="mdi mdi-check"
            >
                no choice
            </DropItem>
        </>
    )
}