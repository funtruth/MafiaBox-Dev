import React from 'react'
import _ from 'lodash'

import { VARTYPE_IS_UID } from '../../common/arrows'
import {
    parseType,
} from '../../common/types';
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import {
    DropEmpty,
    DropItem,
    DropTitle,
} from '../components/Common';

export default function PickUidForAssign(props) {
    const { item, attachVar } = props
    const selectedKey = item.assign && item.assign.value

    const uids = _.filter(attachVar, VARTYPE_IS_UID)

    let handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            parseBy: parseType.variable,
            value: item.key,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>uids</DropTitle>
            {uids.map(item => {
                const chosen = selectedKey === item.key
            
                return (
                    <DropItem
                        key={item.key}
                        chosen={chosen}
                        onClick={() => handleSelect(item)}
                        rightCheck
                        text={item.key}
                    />
                )
            })}
            <DropEmpty list={uids} text="no UIDs found"/>
        </>
    )
}