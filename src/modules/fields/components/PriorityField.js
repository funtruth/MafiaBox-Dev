import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';

import { unnormalize } from '../../common/selectors';
import { showModal } from '../../modal/ModalReducer'
import { rolePrioritySort } from '../FieldReducer'

const ORDER_CIPHER = { 1: '1st', 2: '2nd', 3: '3rd' }

function PriorityField(props) {
    const { fieldKey, path, value, pageRepo } = props

    let handleClick = () => {
        props.showModal(modalType.editPriority, {
            fieldKey,
            path,
            attach: rolePrioritySort(pageRepo),
        })
    }

    return (
        <div className="row -x-p">
            <div className="field-tag" onClick={handleClick}>
                {ORDER_CIPHER[value] || (value ? value + 'th' : 'N/A')}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: unnormalize(state.page.pageRepo),
    }),
    {
        showModal,
    }
)(PriorityField)