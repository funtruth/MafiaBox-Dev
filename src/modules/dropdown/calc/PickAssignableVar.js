import React from 'react'
import _ from 'lodash'

import DropTitle from '../components/DropTitle';
import DropItem from '../components/DropItem';
import { opType, opValueType, DEFAULT_ASSIGN } from '../../modal/vars/components/ops';

export default function PickAssignableVar(props) {
    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            opType: opType.value.key,
            opValueType: opValueType.variable.key,
            value: item,
        })
        props.showDropdown()
    }

    let vars = _(props.attachVar)
        .filter(i => i.isNotDefault)
        .value()

    return (
        <>
            <DropTitle>vars</DropTitle>
            {vars.map(item => (
                <DropItem
                    key={item.key}
                    onClick={() => handleSelect(item)}
                >
                    {item.key}
                </DropItem>
            ))}
        </>
    )
}