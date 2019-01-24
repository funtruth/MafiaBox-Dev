import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import DropParent from '../components/DropParent';
import DropTitle from '../components/DropTitle'

class ShowSubfields extends React.Component{
    render() {
        const { subfieldKey, updateRef } = this.props
        const items = proptool.getSubfields(subfieldKey, updateRef)
        
        return (
            <div>
                <DropTitle>subfields</DropTitle>
                {items.map(item => {
                    return (
                        <DropParent
                            {...this.props}
                            key={item.subfield}
                            dropdownType={item.dropdown}
                            params={{
                                subfieldKey: `${subfieldKey}.${item.subfield}`,
                            }}
                            text={item.subfield}
                        />
                    )
                })}
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    }),
)(ShowSubfields)