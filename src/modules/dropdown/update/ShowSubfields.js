import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import DropParent from '../components/DropParent';
import DropTitle from '../components/DropTitle'

function ShowSubfields(props) {
    const { subfieldKey, updateRef } = props
    const items = proptool.getSubfields(subfieldKey, updateRef)
    
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
                            subfieldKey: `${subfieldKey}_${item.subfield}`,
                            subpath: [`${subfieldKey}_${item.subfield}`],
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