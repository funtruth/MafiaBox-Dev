import React from 'react'
import PageView from '../../page/PageView'

class PageModal extends React.Component {
    render() {
        const { pageKey } = this.props

        return (
            <div className="modal-page">
                <PageView pageKey={pageKey}/>
            </div>
        )
    }
}

export default PageModal