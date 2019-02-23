import React from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'
import DropParent from '../components/DropParent'

export default function PickOp(props) {
    return (
        <>
            <DropTitle>values</DropTitle>
            <DropParent
                {...props}
                dropdownType={dropdownType.setOpValueTo}
                icon="mdi mdi-numeric"
                text="set to"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.pickAssignableVar}
                icon="mdi mdi-clipboard-account"
                text="variables"
            />
            <DropTitle>operators</DropTitle>
            <DropParent
                {...props}
                dropdownType={dropdownType.pickOpType}
                icon="mdi mdi-language-typescript"
                text="operators"
            />
        </>
    )
}