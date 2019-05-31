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
            {items.map(item => (
                <DropParent
                    key={item.subfield}
                    dropdown={item.dropdown}
                    showDropdown={props.showDropdown}
                    params={{
                        subfieldKey: concatField(subfieldKey, item.subfield),
                        subpath: [concatField(subfieldKey, item.subfield)],
                    }}
                    text={item.subfield}
                />
            ))}
        </>
    )
}