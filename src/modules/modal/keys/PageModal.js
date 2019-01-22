import React from 'react'
import PageView from '../../page/PageView'

class PageModal extends React.Component {
    render() {
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
                <PageView {...this.props}/>
            </div>
        )
    }
}

export default PageModal