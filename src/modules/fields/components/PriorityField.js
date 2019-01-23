import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'

class PriorityField extends React.Component{
    _onClick = () => {
        const { fieldKey } = this.props
        this.props.showModal(modalType.editPriority, {
            fieldKey,
        })
    }

    render() {
        const { value } = this.props

        return (
            <div className="row -x-m">
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
    null,
    {
        showModal,
    }
)(PriorityField)