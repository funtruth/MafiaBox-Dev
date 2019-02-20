import React from 'react'
import _ from 'lodash'

import { logicType } from '../types'
import { dropdownType } from '../../dropdown/types'

import LogicVarProp from './LogicVarProp'

const varRef = {
    'types': {
        key: 'types',
        subfield: 'types',
        dropdown: dropdownType.showSubfields,
    },
    'assign': {
        key: 'assign',
        subfield: 'assign',
        dropdown: dropdownType.showSubfields,
    },
}

export default function LogicVarName(props) {
    const { logicInfo } = props
    const {
        data,
        logicType: type
    } = logicInfo

    if (type !== logicType.variable.key) return null
    
    return (
        _.toArray(data).map(item => {
            return (
                <React.Fragment key={item.key}>
                    <LogicVarProp
                        {...props}
                        property={item.value}
                    />
                    {_.toArray(varRef).map(item => (
                        <LogicVarProp
                            {...props}
                            nested
                            key={item.key}
                            property={item.subfield}
                        />
                    ))}
                </React.Fragment>
            )
        })
    )
}