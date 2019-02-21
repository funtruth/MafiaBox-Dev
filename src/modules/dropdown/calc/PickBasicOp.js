import React from 'react'

import { dropdownType } from '../types'

import DropTitle from '../components/DropTitle'
import DropParent from '../components/DropParent'

export default function PickBasicOp(props) {
    let handleSetTo = () => {

    }
    
    return (
        <div>
            <DropTitle>options</DropTitle>
            <DropParent
                {...props}
                dropdownType={dropdownType.inputValue}
                params={{
                    inputText: 'Set to',
                    type: 'number',
                    onSubmit: handleSetTo,
                }}
                icon="mdi mdi-numeric"
                text="set to"
            />
            <DropParent
                {...props}
                dropdownType={dropdownType.pickOpType}
            />
        </div>
    )
}