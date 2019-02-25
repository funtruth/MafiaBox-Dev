import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'
import { modalType } from '../../modal/types';
import { variableType } from '../types';
import { orderOfOp } from '../../modal/vars/components/ops'

import { showModal } from '../../modal/ModalReducer'

function LogicVarProp(props) {
    const { property, item, vars, path } = props

    let newPath = [...path, item.key]

    let handleModal = () => {
        props.showModal(modalType.assignVar, {
            attachVar: vars,
            attach: item,
            path: newPath,
        })
    }
    
    switch(property) {
        case 'types':
            return (
                <div className="row-nowrap" style={{ marginRight: 6 }}>
                    <div
                        className="common-bubble --grey27"
                        style={{
                            borderRadius: '6px 0px 0px 6px',
                        }}
                    >
                        {property}
                    </div>
                    <div
                        className="logic-pick-update app-onclick"
                        menu-type={dropdownType.pickVarType}
                        app-onclick-props={JSON.stringify({
                            currentValue: item.variableTypes,
                            path: newPath,
                        })}
                        highlight="true"
                        style={{
                            borderRadius: '0px 6px 6px 0px',
                        }}
                    >
                        {item.variableTypes.map(type => <i key={type} className={`${variableType[type].icon} letter-s`}/>)}
                        {item.variableTypes.length === 0 && '...'}
                    </div>
                </div>
            )
        case 'assign':
            return (
                <div className="row-nowrap">
                    <div
                        className="common-bubble --grey27"
                        style={{
                            borderRadius: '6px 0px 0px 6px',
                        }}
                    >
                        {property}
                    </div>
                    <div
                        className="logic-pick-update"
                        highlight="true"
                        onClick={handleModal}
                        style={{
                            borderRadius: '0px 6px 6px 0px',
                        }}
                    >
                        {orderOfOp(item.assign) || '...'}
                    </div>
                </div>
            )
        default:
            return null
    }
}

export default connect(
    null,
    {
        showModal,
    }
)(LogicVarProp)