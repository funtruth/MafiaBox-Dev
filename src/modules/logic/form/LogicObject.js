import React from 'react'
import * as proptool from '../proptool'

import { logicType } from '../types'

import LogicExpandable from './LogicExpandable';

export default function LogicObject(props) {
    const { updateRef, logicInfo } = props

    if (logicInfo.logicType !== logicType.update.key) return null
    
    return (
        proptool.getSubfields('', updateRef).map((item, index) => (
            <LogicExpandable
                {...props}
                key={index}
                property={item.subfield}
                prefix={item.subfield}
            />
        ))
    )
}