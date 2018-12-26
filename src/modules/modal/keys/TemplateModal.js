import React from 'react'
import { connect } from 'react-redux'
import TemplateView from '../../template/TemplateView'

class TemplateModal extends React.Component {
    render() {
        const { modalParams } = this.props
        const { boardType } = modalParams

        return (
            <div className="modal-page">
                <TemplateView boardType={boardType}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalParams: state.modal.modalParams,
    })
)(TemplateModal)