import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';
import { updateSourceType } from '../../common/types';

import { showModal } from '../../modal/ModalReducer'
import { rolePrioritySort } from '../FieldReducer'

function PriorityField(props) {
    const { fieldKey, path, value, pageRepo } = props

    let handleClick = () => {//TODO WIP first
        props.showModal(modalType.editPriority, {
            fieldKey,
            path,
            attach: rolePrioritySort(pageRepo),
            updateSource: updateSourceType.topModal,
        })
    }

    return (
        <div className="row -x-p">
            <div className="field-tag" onClick={handleClick}>
                {value || 'N/A'}
            </div>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(PriorityField)