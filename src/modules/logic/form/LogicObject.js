import React from 'react'

import {
    logicType,
} from '../types'

import {
    getSubfields,
} from '../proptool'

import LogicExpandable from './LogicExpandable';

export default function LogicObject(props) {
    const { logicInfo } = props

    if (logicInfo.logicType !== logicType.update.key) return null
    
    return (
        getSubfields('').map((item, index) => (
            <LogicExpandable
                {...props}
                key={index}
                property={item.subfield}
                prefix={item.subfield}
            />
        ))
    )
}