import React from 'react'
import TemplateView from '../../template/TemplateView'

class TemplateModal extends React.Component {
    render() {
        const { boardType } = this.props

        return (
            <div className="modal-page">
                <TemplateView boardType={boardType}/>
            </div>
        )
    }
}

export default TemplateModal