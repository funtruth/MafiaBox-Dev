import React from 'react'
import { connect } from 'react-redux'

import {
    concatField,
    getSubfields,
} from '../../logic/proptool'

import {
    DropParent,
    DropTitle,
} from '../components/Common'

function ShowSubfields(props) {
    const { subfieldKey, updateRef } = props
    const items = getSubfields(subfieldKey, updateRef)
    
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

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(ShowSubfields)