import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import DropParent from '../components/DropParent';

class AddUpdateField extends React.Component{
    render() {
        const { subfieldKey, updateRef, attach } = this.props
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
                            currentValue: attach[newKey] && attach[newKey].value,
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
        playerRef: state.template.playerRef,
    }),
)(AddUpdateField)