import React from 'react'
import TemplateView from '../../template/TemplateView'

class TemplateModal extends React.Component {
    render() {
        const { boardType } = this.props

        return (
            <div
                style={{
                    minHeight: 400,
                    minWidth: 600,
                    height: '80vh',
                    width: '65vw',
                    overflow: 'scroll',
                }}
            >
                <TemplateView boardType={boardType}/>
            </div>
        )
    }
}

export default TemplateModal