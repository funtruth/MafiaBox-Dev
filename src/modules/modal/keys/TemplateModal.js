import React from 'react'
import { connect } from 'react-redux'
import TemplateView from '../../template/TemplateView'

class TemplateModal extends React.Component {
    render() {
        const { modalParams } = this.props
        const { fieldMapKey } = modalParams

        return (
            <div className="modal-page">
                <TemplateView fieldMapKey={fieldMapKey}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalParams: state.modal.modalParams,
    })
)(TemplateModal)