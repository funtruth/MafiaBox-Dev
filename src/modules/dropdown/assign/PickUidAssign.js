import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import { opType, opValueType, DEFAULT_ASSIGN } from '../../modal/vars/components/ops';

import DropTitle from '../components/DropTitle';
import DropEmpty from '../components/DropEmpty';

export default function PickUidForAssign(props) {
    const { item, attachVar } = props
    const uids = _.filter(attachVar, i => i.variableTypes && i.variableTypes.includes(variableType.uid.key))
    const selectedKey = item.assign && item.assign.value && item.assign.value.key

    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            opType: opType.value.key,
            opValueType: opValueType.variable.key,
            value: item,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>uids</DropTitle>
            {uids.map(item => {
                const chosen = typeof selectedKey === 'string' && selectedKey === item.key
            
                return (
                    <div
                        key={item.key}
                        className="drop-down-menu-option"
                        chosen={chosen.toString()}
                        onClick={() => handleSelect(item)}
                    >
                        {item.key}
                        <i className="mdi mdi-check"/>
                    </div>
                )
            })}
            <DropEmpty>no UIDS found</DropEmpty>
        </>
    )
}