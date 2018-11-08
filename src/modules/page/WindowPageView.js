import React from 'react'
import PageView from './PageView'

class WindowPageView extends React.Component {
    render() {
        const { match } = this.props
        const { pageKey } = match.params

        return (
            <div className="story-view">
                <PageView pageKey={pageKey}/>
            </div>
        )
    }
}

export default WindowPageView