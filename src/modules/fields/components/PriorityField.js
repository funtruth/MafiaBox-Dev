import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'
import { rolePrioritySort } from '../FieldReducer'

class PriorityField extends React.Component{
    _onClick = () => {
        const { fieldKey, pageRepo } = this.props
        this.props.showModal(modalType.editPriority, {
            fieldKey,
            attach: rolePrioritySort(pageRepo),
        })
    }

    render() {
        const { value } = this.props

        return (
            <div className="row -x-p">
                <div
                    className="field-tag"
                    onClick={this._onClick}
                >
                    {value || 'N/A'}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(PriorityField)