import React from 'react'
import _ from 'lodash'

import { VARTYPE_IS_UID } from '../../common/arrows'
import {
    mathType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/types';

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
            ...DEFAULT_ASSIGN,
            mathType: mathType.value,
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
                        rightIcon="mdi mdi-check"
                    >
                        {item.key}
                    </DropItem>
                )
            })}
            <DropEmpty>no UIDS found</DropEmpty>
        </>
    )
}