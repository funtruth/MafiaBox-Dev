import React from 'react'
import { connect } from 'react-redux'
import PageView from '../../page/PageView'

class PageModal extends React.Component {
    render() {
        const { modalParams } = this.props
        const { pageKey } = modalParams

        return (
            <div className="modal-page">
                <PageView pageKey={pageKey}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalParams: state.modal.modalParams,
    })
)(PageModal)