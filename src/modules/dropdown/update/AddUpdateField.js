import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import DropParent from '../components/DropParent';

class AddUpdateField extends React.Component{
    render() {
        const { subfieldKey, updateRef } = this.props
        const items = proptool.getSubfields(subfieldKey, updateRef)
        
        return (
            items.map(item => {
                const newKey = `${subfieldKey}.${item.subfield}`

                return (
                    <DropParent
                        {...this.props}
                        key={item.subfield}
                        dropdownType={item.dropdown}
                        params={{
                            subfieldKey: newKey,
                        }}
                        text={item.subfield}
                    />
                )
            })
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    }),
)(AddUpdateField)