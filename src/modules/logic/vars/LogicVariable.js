import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { logicType } from '../types'

import { showModal } from '../../modal/ModalReducer'

import LogicVarProp from './LogicVarProp'
import LogicVarHeader from './LogicVarHeader';

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
                    <LogicVarHeader>{item.key}</LogicVarHeader>
                    {!item.isBeingAssigned &&
                        <LogicVarProp
                            {...props}
                            property="types"
                            item={item}
                        />
                    }
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