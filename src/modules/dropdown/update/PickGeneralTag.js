import React from 'react'

import {
    dropdownType
} from '../types'

import {
    concatField,
    getSubfields,
} from '../../logic/proptool'

import {
    DropParent,
    DropTitle,
} from '../components/Common'

//input => fieldKey
//ouput => all general tags, leading to pickBoolean
export default function PickGeneralTag(props) {
    const { subfieldKey } = props
    const items = getSubfields(subfieldKey)
    
    return (
        <>
            <DropTitle>subfields</DropTitle>
            {items.map(item => {
                return (
                    <DropParent
                        {...props}
                        key={item.subfield}
                        dropdownType={dropdownType.pickBoolean}
                        params={{
                            subfieldKey: concatField(subfieldKey, item.subfield),
                            subpath: [concatField(subfieldKey, item.subfield)],
                        }}
                        text={item.subfield}
                    />
                )
            })}
        </>
    )
}