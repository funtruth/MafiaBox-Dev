import React from 'react'
import _ from 'lodash'

import { parseType } from '../../common/types';
import {
    LOGIC_ITEM_VAR,
} from '../../modal/vars/components/types';

import {
    DropItem,
    DropTitle,
} from '../components/Common'

//TODO this is invalid
export default function PickAssignableVar(props) {
    const { attachVar } = props

    let handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            parseBy: parseType.variable,
            value: item,
        })
        props.showDropdown()
    }

    const vars = _.filter(attachVar, i => !i.static)
    return (
        <>
            <DropTitle>vars</DropTitle>
            {vars.map(item => (
                <DropItem
                    key={item.key}
                    onClick={() => handleSelect(item)}
                    text={item.key}
                />
            ))}
        </>
    )
}