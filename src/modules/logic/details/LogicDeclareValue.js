import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { orderOfOp } from '../../modal/vars/components/types'
import { variableType } from '../types';
import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'

function LogicVarAssign(props) {
    const { item, vars, path, updateSource } = props

    let newPath = [...path, item.key]

    const noTypeSelected = !item.variableTypes || !item.variableTypes.length
    if (noTypeSelected) return null

    const isNumber = item.variableTypes.includes(variableType.number.key)
    const isUid = item.variableTypes.includes(variableType.uid.key)
    const isBoolean = item.variableTypes.includes(variableType.boolean.key)

    let handleNumber = () => {
        props.showModal(modalType.assignNum, {
            attachVar: vars,
            attach: item,
            path: newPath,
        })
    }

    let handleString = () => {
        props.showModal(modalType.editString, {
            attachVar: vars,
            attach: item,
            path: newPath,
        })
    }
    
    function innerContent() {
        if (isNumber) {
            return (
                <div
                    className="logic-pick-update"
                    highlight="true"
                    onClick={handleNumber}
                >
                    {orderOfOp(item.assign) || '...'}
                </div>
            )
        } else if (isUid) {
            return (
                <div
                    className="logic-pick-update app-onclick"
                    menu-type={dropdownType.pickUidAssign}
                    app-onclick-props={JSON.stringify({
                        attachVar: vars,
                        item,
                        path,
                        subpath: [item.key, 'assign'],
                        updateSource,
                    })}
                >
                    {item.assign.value.key || '...'}
                </div>
            )
        } else if (isBoolean) {
            return (
                <div
                    className="logic-pick-update app-onclick"
                    menu-type={dropdownType.pickBooleanAssign}
                    app-onclick-props={JSON.stringify({
                        attachVar: vars,
                        item,
                        path,
                        subpath: [item.key, 'assign'],
                        updateSource,
                    })}
                >
                    {item.assign.value || '...'}
                </div>
            )
        } else {
            return (
                <div
                    className="logic-pick-update"
                    highlight="true"
                    onClick={handleString}
                >
                    {'...'}
                </div>
            )
        }
    }

    return (
        <div className="row-nowrap" style={{ marginLeft: 6, borderRadius: 6, overflow: 'hidden' }}>
            <div className="common-bubble --grey27" style={{ borderRadius: 0 }}>assign</div>
            {innerContent()}
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(LogicVarAssign)