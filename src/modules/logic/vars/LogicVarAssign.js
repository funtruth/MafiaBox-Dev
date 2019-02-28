import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { orderOfOp } from '../../modal/vars/components/ops'
import { variableType } from '../types';
import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'

function LogicVarAssign(props) {
    const { item, vars, path, updateSource } = props

    let newPath = [...path, item.key]
    const noTypeSelected = !item.variableTypes || !item.variableTypes.length
    const isNumber = item.variableTypes && item.variableTypes.includes(variableType.number.key)
    const isUid = item.variableTypes && item.variableTypes.includes(variableType.uid.key)

    let handleModal = () => {
        props.showModal(modalType.assignVar, {
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
                    onClick={handleModal}
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
        }
        return null
    }

    if (noTypeSelected) return null

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