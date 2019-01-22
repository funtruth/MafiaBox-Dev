import React from 'react'
import PageView from '../../page/PageView'

class PageModal extends React.Component {
    render() {
        const { pageKey, location } = this.props

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
                <PageView
                    pageKey={pageKey}
                    location={location}
                />
            </div>
        )
    }
}

export default PageModal