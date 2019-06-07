import React from 'react'

import { logicType } from '../../common/types'

import Tag from '../../components/Tag';

export default function LogicUpdateThrottle({logicItem}) {
    if (logicItem.logicType !== logicType.update.key) return null;

    return (
        <Tag text="TODO"></Tag>
    )
}