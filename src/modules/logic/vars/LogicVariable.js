import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { logicType } from '../types'

import { showModal } from '../../modal/ModalReducer'

import LogicVarProp from './LogicVarProp'

function LogicVarName(props) {
    const { logicInfo } = props
    const {
        data,
        logicType: type
    } = logicInfo
    
    if (type !== logicType.variable.key) return null
    
    return (
        _.toArray(data).map(item => {
            return (
                <React.Fragment key={item.key}>
                    <LogicVarProp
                        property={item.value}
                    />
                    <LogicVarProp
                        {...props}
                        property="types"
                        item={item}
                    />
                    <LogicVarProp
                        {...props}
                        property="assign"
                        item={item}
                    />
                </React.Fragment>
            )
        })
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(LogicVarName)