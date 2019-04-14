import React from 'react'

import {
    concatField,
    getSubfields,
} from '../../logic/proptool'

import {
    DropParent,
    DropTitle,
} from '../components/Common'

export default function ShowSubfields(props) {
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
                        dropdownType={item.dropdown}
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